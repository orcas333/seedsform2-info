Tasks = new Mongo.Collection("tasks");

Router.route('/', {
  template: 'contactform2'
});
Router.route('/thankyou');
Router.configure({
    layoutTemplate: 'main'
});

if (Meteor.isClient) {
  // counter starts at 0
  // Session.setDefault('counter', 0);

  // Template.hello.helpers({
  //   counter: function () {
  //     return Session.get('counter');
  //   }
  // });

  // Template.hello.events({
  //   'click button': function () {
  //     // increment the counter when button is clicked
  //     Session.set('counter', Session.get('counter') + 1);
  //   }
  // });

  Template.body.helpers({
    tasks: function () {
      return Tasks.find({});
    }
  });

  Template.body.events({
    "submit .new-task": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var inputFirstName = event.target.firstName.value;
      var inputLastName = event.target.lastName.value;
      var inputEmail = event.target.email.value;
      var inputPhone = event.target.phone.value;

      // Insert a task into the collection
      Tasks.insert({
        firstName: inputFirstName,
        lastName: inputFirstName,
        email: inputEmail,
        phone: inputPhone,
        createdAt: new Date() // current time
      });

      // Clear form
      // event.target.firstName.value = "";
      // event.target.lastName.value = "";
      // event.target.email.value = "";
      // event.target.phone.value = "";

      console.log("Form submitted");
      console.log(event.type);
      return false;
    }
  });

  Template.contactform2.events({
    'click #signup': function () {
      event.preventDefault();
      Router.go('/thankyou');
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

