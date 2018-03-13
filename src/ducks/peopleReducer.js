import axios from "axios";

const initialState = {
  people: [],
  loading: false,
  error: false
};

const GET_PEOPLE = "GET_PEOPLE";
const ADD_PERSON = "ADD_PERSON";
const DELETE_PERSON = "DELETE_PERSON";

export function getPeople() {
  return {
    type: GET_PEOPLE,
    payload: axios
      .get("https://www.swapi.co/api/people?page=2")
      .then(response => response.data.results)
      .catch(err => console.log(err))
  };
}
export function addPerson(person) {
  return {
    type: ADD_PERSON,
    payload: person
  };
}
export function deletePerson(index) {
  return {
    type: DELETE_PERSON,
    payload: index
  };
}

function peopleReducer(state = initialState, action) {
  console.log("action hit!: ", JSON.stringify(action));

  switch (action.type) {
    case `${GET_PEOPLE}_PENDING`:
      return { ...state, loading: true, error: false };

    case `${GET_PEOPLE}_FULFILLED`:
      let allPeople = action.payload.map(person => person.name);
      return {
        ...state,
        people: [...state.people, ...allPeople],
        loading: false,
        error: false
      };

    case `${GET_PEOPLE}_REJECTED`:
      return { ...state, loading: false, error: true };

    case ADD_PERSON:
      return { ...state, people: [...state.people, action.payload] };

    case DELETE_PERSON:
      let arrCopy = state.people.slice();
      arrCopy.splice(action.payload, 1);
      return { ...state, people: arrCopy };
    default:
      return state;
  }
}

export default peopleReducer;
