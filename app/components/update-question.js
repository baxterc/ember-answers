import Ember from 'ember';

export default Ember.Component.extend({
  updateQuestionForm: false,

  actions: {
    updateQuestionFormShow() {
      this.set('updateQuestionForm', true);
    },

    updateQuestion(question) {
      var params = {
        author: this.get('update-author'),
        content: this.get('update-content'),
        notes: this.get('update-notes')
      };
      this.set('updateQuestion', false);
      this.sendAction('updateQuestion', question, params);
    }
  }
});
