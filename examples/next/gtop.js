// inspired by https://github.com/elvetemedve/gnome-shell-extension-system-monitor/blob/12c06a5ef5c0877c4d4025269c42cedf967c6e89/System_Monitor%40bghome.gmail.com/meter.js

// const prettyBytes = require('pretty-bytes');
const prettyBytes = prettishBytes();
const { GTop } = imports.gi;

const procList = new GTop.glibtop_proclist();
const processMemory = new GTop.glibtop_proc_mem();
const processArgs = new GTop.glibtop_proc_args();
const processUid = new GTop.glibtop_proc_uid();

const list = GTop
  .glibtop_get_proclist(procList, 0, 0)
  .map(pid => {
    GTop.glibtop_get_proc_mem(processMemory, pid);
    GTop.glibtop_get_proc_uid(processUid, pid);
    const args = GTop.glibtop_get_proc_args(processArgs, pid, 0);

    return {
      pid,
      mem: true ? calculateRamOnly(processMemory) : calculateAllRam(processMemory),
      args,
      ppid: processUid.ppid
    };
  });

const tree = getTree(list);
printTree(tree);

function printTree(tree, offset = 0) {
  tree.nodes.forEach(node => {
    // console.log(node)
    let str = `${' '.repeat(offset)}- ${node.ps.pid} ${node.ps.args.slice(0, 100)}`;

    const memParts = [];

    if (node.ps.mem === 0) {
      memParts.push(0);
    } else {
      memParts.push(prettyBytes(node.ps.mem));
    }

    if (node.tree.mem > 0) {
      memParts.push(prettyBytes(node.tree.mem));
    }

    if (!(memParts.length === 1 && memParts[0] === 0)) {
      str += ` (${memParts.join(' | ')})`;
    }

    console.log(str);
    printTree(node.tree, offset + 2);
  });
}

function getTree(list, ppid = 0) {
  let mem = 0;

  const nodes = list.filter(_ => _.ppid === ppid).reduce((acc, ps) => {
    const subTree = getTree(list, ps.pid);
    mem += ps.mem + subTree.mem;

    acc.push({
      ps,
      tree: subTree
    });

    return acc;
  }, []);

  return {
    nodes,
    mem
  };
}

function calculateRamOnly(processMemory) {
  return processMemory.resident;
}

function calculateAllRam(processMemory) {
  return processMemory.vsize + processMemory.resident + processMemory.share;
}

// copied from https://github.com/sindresorhus/pretty-bytes/blob/fe126eedd38947237d014740a12bfb39495cac45/index.js (MIT)
function prettishBytes() {
  const UNITS = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

  return num => {
    // return num;
    if (!Number.isFinite(num)) {
      throw new TypeError(`Expected a finite number, got ${typeof num}: ${num}`);
    }

    const neg = num < 0;

    if (neg) {
      num = -num;
    }

    if (num < 1) {
      return (neg ? '-' : '') + num + ' B';
    }

    const exponent = Math.min(Math.floor(Math.log10(num) / 3), UNITS.length - 1);
    const numStr = Number((num / Math.pow(1024, exponent)).toPrecision(3));
    const unit = UNITS[exponent];

    return (neg ? '-' : '') + numStr + ' ' + unit;
  };
}
