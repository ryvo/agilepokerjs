export default class ActionType {
  static getActionTypes(listOfTypes, actionGroup) {
    const actionTypeObject = {};
    listOfTypes.forEach(actionType => {
      actionTypeObject[`${actionType}`] = `${actionGroup}_${actionType}`;
    })
  }
}