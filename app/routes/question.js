import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    return this.store.findRecord('question', params.question_id);
  },

  actions: {
    updateQuestion(question, params) {
      Object.keys(params).forEach(function(key) {
        if(params[key]!==undefined) {
          question.set(key,params[key]);
        }
      });
      question.save();
      this.transitionTo('question', question.id);
    },
    deleteQuestion(question) {
      if(confirm("Are you sure you want to delete this question?")) {
        var answers = question.get('answers').map(function(answer) {
          return answer.destroyRecord();
        });
        Ember.RSVP.all(answers).then(function () {
          return question.destroyRecord();
        });
        this.transitionTo('index');
      }
    },
    deleteAnswer(answer) {
      if(confirm("Are you sure you want to delete this answer?")) {
        return answer.destroyRecord();
      }
    },
    addAnswer(params) {
      var question = params.question;
      var newAnswer = this.store.createRecord('answer', params);
      question.get('answers').addObject(newAnswer);
      newAnswer.save().then(function() {
        return question.save();
      });
      this.transitionTo('question', question.id);
    },
    upvote(answer) {
      var ansScore = (answer.get('score')) + 1;
      answer.set('score', ansScore);
      answer.save();
    },
    downvote(answer) {
      var ansScore = (answer.get('score')) - 1;
      answer.set('score', ansScore);
      answer.save();
    }
  }
});
