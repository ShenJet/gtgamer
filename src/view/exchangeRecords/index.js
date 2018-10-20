import { connect } from 'react-redux'
import ExchangeRecordsComponent from './exchangerecords-component'

const mapDispatchToProps = (dispatch, props) => {
    return {

    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const ExchangeRecords = connect(
    mapStateToProps,
    mapDispatchToProps
)(ExchangeRecordsComponent)

export default ExchangeRecords;