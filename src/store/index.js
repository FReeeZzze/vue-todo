const store = {
  debug: false,
  state: {
    currentFilter: "",
    filters: new Map([
      ["Всe", "all"],
      ["Выполненые", true],
      ["Активные", false],
    ]),
    todoList: [
      {
        id: 1,
        name: "Выполнить проверку работы #1",
        completed: false,
      },
      {
        id: 2,
        name: "Выполнить проверку работы #2",
        completed: true,
      },
      {
        id: 3,
        name: "Выполнить проверку работы #3",
        completed: false,
      },
    ],
  },
  setCurrentFilter(payload) {
    if (this.debug) console.log("setCurrentFilter вызвано с ", payload);
    this.state.currentFilter = payload;
  },
};

export default store;
