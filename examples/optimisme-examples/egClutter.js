'use strict'

// transformed from /vendor/optimisme-examples/egClutter.js by /scripts/transform.js
// (license unspecified)

const Gdk = require('Gdk');
const Clutter = require('Clutter');
const GtkClutter = require('GtkClutter');
const Gio = require('Gio');
const GLib = require('GLib');
const Gtk = require('Gtk');

class App {
  constructor() {
    this.title = 'Example Clutter';
    GLib.set_prgname(this.title);
  }

  run(ARGV) {
    this.application = new Gtk.Application();
    this.application.connect('activate', () => {
      this.onActivate();
    });
    this.application.connect('startup', () => {
      this.onStartup();
    });
    this.application.run([]);
  }

  onActivate() {
    this.window.show_all();
  }

  onStartup() {
    this.initClutter();
    this.buildUI();
  }

  initClutter() {
    GtkClutter.init(null, 0);
    Clutter.init(null, 0);
  }

  buildUI() {
    this.window = new Gtk.ApplicationWindow({
      application: this.application,
      title: this.title,
      default_height: 500,
      default_width: 700,
      window_position: Gtk.WindowPosition.CENTER
    });
    try {
      this.window.set_icon_from_file(`${__dirname}/assets/appIcon.png`);
    } catch (err) {
      this.window.set_icon_name('application-x-executable');
    }

    this.window.add(this.buildBody());
  }

  buildBody() {
    let embed, grid, titleRotate, scale, buttonStart, buttonStop;

    embed = new GtkClutter.Embed();
    embed.set_size_request(400, 240);

    this.position = new Gtk.Label({ label: 'Drag the square' });
    this.position.set_size_request(300, -1);

    titleRotate = new Gtk.Label({ label: 'Rotation: ' });
    titleRotate.set_size_request(150, -1);

    scale = new Gtk.Scale({
      digits: 1,
      draw_value: true,
      value_pos: Gtk.PositionType.LEFT
    });
    scale.set_range(-35, 35);
    scale.set_size_request(150, -1);
    scale.connect('change-value', widget => {
      this.actor.set_rotation(
        Clutter.RotateAxis.Y_AXIS,
        widget.get_value(),
        50,
        0,
        0
      );
    });

    buttonStart = new Gtk.Button({ label: 'Play' });
    buttonStart.connect('clicked', () => {
      let tg, pt;

      pt = new Clutter.PropertyTransition({
        property_name: 'rotation-angle-z'
      });
      pt.set_from(0);
      pt.set_to(360);
      pt.set_duration(2000);
      pt.set_progress_mode(Clutter.AnimationMode.LINEAR);

      tg = new Clutter.TransitionGroup();
      tg.set_duration(2000);
      tg.set_repeat_count(-1); // Infinite
      tg.add_transition(pt);
      // Add more property transitions ...

      this.actor.add_transition('rotate_transition', tg);

      scale.set_sensitive(false);
      buttonStart.set_sensitive(false);
      buttonStop.set_sensitive(true);
    });

    buttonStop = new Gtk.Button({ label: 'Stop', sensitive: false });
    buttonStop.connect('clicked', () => {
      this.actor.remove_transition('rotate_transition');
      this.actor.set_rotation_angle(Clutter.RotateAxis.Z_AXIS, 0);

      scale.set_sensitive(true);
      buttonStart.set_sensitive(true);
      buttonStop.set_sensitive(false);
    });

    grid = new Gtk.Grid({ column_spacing: 6, margin: 15, row_spacing: 6 });
    grid.attach(embed, 0, 0, 1, 3);
    grid.attach(this.position, 1, 0, 2, 1);
    grid.attach(titleRotate, 1, 1, 1, 1);
    grid.attach(scale, 2, 1, 1, 1);
    grid.attach(buttonStart, 1, 2, 1, 1);
    grid.attach(buttonStop, 2, 2, 1, 1);

    this.stage = embed.get_stage();
    this.stage.set_color(
      new Clutter.Color({ red: 255, green: 255, blue: 255, alpha: 255 })
    );
    this.stage.add_child(this.getActor());

    return grid;
  }

  getActor() {
    let colorDark, colorLight, action;

    colorDark = new Clutter.Color({
      red: 100,
      green: 125,
      blue: 100,
      alpha: 255
    });
    colorLight = new Clutter.Color({
      red: 150,
      green: 175,
      blue: 150,
      alpha: 255
    });

    action = new Clutter.DragAction({
      drag_axis: Clutter.DragAxis.AXIS_NONE,
      x_drag_threshold: 0,
      y_drag_threshold: 0
    });
    action.connect('drag-begin', (action, actor, x, y, modifiers) => {
      this.position.set_text(`X: ${x.toFixed(2)}, Y: ${y.toFixed(2)} - S`);
    });
    action.connect('drag-end', (action, actor, x, y, modifiers) => {
      this.position.set_text(`X: ${x.toFixed(2)}, Y: ${y.toFixed(2)} - E`);
    });
    action.connect('drag-motion', (action, actor, x, y, modifiers) => {
      this.position.set_text(`X: ${x.toFixed(2)}, Y: ${y.toFixed(2)} - D`);
    });
    /* 
        // Simple actor example:
        this.actor = new Clutter.Actor({
            background_color: colorDark,
            x: 150, y: 150,
            height: 100, width: 100
        });
        */
    // Textured actor example
    this.actor = new Clutter.Texture({
      background_color: colorDark,
      filename: `${__dirname}/assets/egClutter.png`,
      height: 100,
      reactive: true,
      x: 150,
      y: 150,
      width: 100
    });
    this.actor.connect('enter-event', (actor, event) => {
      actor.set_background_color(colorLight);
    });
    this.actor.connect('leave-event', (actor, event) => {
      actor.set_background_color(colorDark);
    });
    this.actor.add_action(action);

    return this.actor;
  }
}

//Run the application
let app = new App();
app.run(ARGV);
