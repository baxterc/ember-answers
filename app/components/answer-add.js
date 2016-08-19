import Ember from 'ember';

export default Ember.Component.extend({
  addAnswerForm: false,

  actions: {
    showAnswerForm() {
      this.set("addAnswerForm", true);
    },
    addAnswer() {
      var params = {
        author: this.get("answer-author" || ""),
        content: this.get("answer-content" || ""),
        question: this.get("question")
      };
      this.sendAction("addAnswer", params);
      this.set("addAnswerForm", false);
    }
  }
});
