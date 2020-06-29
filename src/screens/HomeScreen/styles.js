import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  body: {
    flex: 1,
  },
  formContainer: {
    flexDirection: 'row',
    height: 80,
    marginTop: 10,
    marginBottom: 20,
    flex: 1,
    paddingTop: 10,
    paddingBottom: 30,
    paddingLeft: 30,
    paddingRight: 30,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: '#009688',
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  listContainer: {
    marginTop: 20,
    padding: 20,
  },
  entityContainer: {
    borderRadius: 4,
    borderWidth: 0.1,
    borderColor: '#d6d7da',
    padding: 15,
    marginBottom: 10,
    shadowOffset: {
      width: 1,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.01,

    elevation: 2,
  },
  entityText: {
    fontSize: 20,
    color: '#333333',
  },
  text: {
    fontSize: 16,
    paddingBottom: 5,
    alignSelf: 'center',
    color: '#333333',
  },
});
