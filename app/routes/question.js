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
        question.destroyRecord();
        this.transitionTo('index');
      }
    },
    addAnswer(params) {
      debugger;
      var question = params.question;
      var newAnswer = this.store.createRecord('answer', params);
      question.get('answers').addObject(newAnswer);
      newAnswer.save().then(function() {
        return question.save();
      });
      this.transitionTo('question', question.id);
    }
  }
});
