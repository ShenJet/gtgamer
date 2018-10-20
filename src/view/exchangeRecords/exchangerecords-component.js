import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import style from './exchange.less'
// import Button from '../../module/mo-button'
import {List,NavBar,Icon,Button} from 'antd-mobile'
import axios from '../../https'

@CSSModules(style)
class ExchangeTbeansComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageindex: 1,
            pagesize: 10,
            records: [],
            hasmore: true
        }
    }

    componentDidMount(){
        // console.log('componentDidMount');
        this.getRecords(this.state.pageindex,this.state.pagesize)
    }

    getRecords(pageindex,pagesize){
        var self = this
        // console.log('开始axios请求');

        axios.post("/Game/GetUserTBeanHistory",{
            PageIndex: pageindex,
            PageSize: pagesize
        }).then(res=>{
            // console.log(res);
            
            let records = res.Data.History
            let hasmore = res.Data.HasMore
            self.setState({
                records,
                hasmore
            })
            // this.exchangeList(records)
            // records.map(function(v,i) {
            //     return (<tr>
            //             <td>{v.RecordTime}</td>
            //             <td>{v.ChangeType}</td>/td>
            //             <td>{v.TBeanCount}</td>
            //         </tr>)
            // })
        }).catch(err=>{
            Toast.fail('获取记录失败，请稍后重试！');
            console.log('error', error);
        })
    }

    exchangeList(){
        this.state.records.map(function(v,i) {
            // console.log(v);
            
            return (<tr>
                    <td>{v.RecordTime}</td>
                    <td>{v.ChangeType}</td>
                    <td>{v.TBeanCount}</td>
                </tr>)
        })
    }   
    next(){
        this.setState({
            pageindex:this.state.pageindex+1
        },
        function(){
            // console.log(this.state.pageindex);
            this.getRecords(this.state.pageindex,this.state.pagesize)
        })
    }
    last(){
        this.setState({
            pageindex:this.state.pageindex-1
        },
        function(){
            // console.log(this.state.pageindex);
            this.getRecords(this.state.pageindex,this.state.pagesize)
        })
    }
    render() {
        return (
            <div styleName="wrap">
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >T豆记录</NavBar>
                <List>
                    <List.Item>
                        <div className={style.listhead}>
                        <div className={style.l}>时间</div>
                        <div className={style.m}>类型</div>
                        <div className={style.r}>T豆</div>
                        </div>
                    </List.Item>
                        {
                            this.state.records.map(function(v,i) {
                                return (
                                    <List.Item  key={v.RecordTime+i}>
                                        <div className={style.item}>
                                        <div className={style.l}>{v.RecordTime}</div>
                                        <div className={style.m}>{v.ChangeType}</div>
                                        <div className={style.r}>{v.TBeanCount}</div>
                                        </div>
                                    </List.Item>)
                            })
                        }       
                </List>
                <div className={style.btns}>
                    <Button onClick={() =>this.last()} disabled={this.state.pageindex-1<=0}>上一页</Button>   
                    <Button onClick={() =>this.next()} disabled={!this.state.hasmore}>下一页</Button>
                </div>

            </div>
        )
    }
}

ExchangeTbeansComponent.propTypes = {
    goRankPage: PropTypes.func,
}

export default ExchangeTbeansComponent