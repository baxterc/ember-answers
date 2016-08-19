import Ember from 'ember';

export default Ember.Component.extend({
  addQuestion: false,
  actions: {
    questionFormShow() {
      this.set('addQuestion', true);
    },

    saveQuestion() {
      var params = {
        author: this.get('question-author'),
        content: this.get('question-content'),
        notes: this.get('question-notes')
      };
      this.set('addQuestion', false);
      this.sendAction('saveQuestion', params);
    }
  }
});
