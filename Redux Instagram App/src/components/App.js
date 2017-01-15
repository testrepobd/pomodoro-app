import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Main from './Main';

//Passes state to Main component
function mapStateToProps(state){
	return {
		posts:state.posts,
		comments:state.comments
	};
}
//Passes actions to Main component
function mapDispatchToProps(dispatch){
	return bindActionCreators(actionCreators,dispatch);
}
//combines state/actions with Main component
const App = connect(mapStateToProps,mapDispatchToProps)(Main);

export default App;