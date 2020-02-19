import * as React from 'react';
import { Alert, Icon } from 'antd';
import styled from 'styled-components';


class LineUp extends React.Component{
    render(){
        return <Alert 
        message="排队信息" 
        type="success"
        description={<div>
            <LineListInfos>
                <div>目前场内车辆<span style={{fontSize:22}}>19</span>辆车</div>
                <div className="info-list" >
                    <div className="info-box" >
                        <Icon type="experiment" />
                        <div className="stone_name">米石</div>
                        <div className="car_number">15辆</div>
                    </div>
                    <div className="info-box" >
                        <Icon type="experiment" />
                        <div className="stone_name">原石</div>
                        <div className="car_number">15辆</div>
                    </div>
                </div>
            </LineListInfos>
        </div>}
        />
    }
}

const LineListInfos = styled.div`
        font-size: 16px;
        .info-list{
            display: flex;
            flex-wrap: wrap;
            margin-top: 10px;
        }
        .info-box{
            display: flex;
            flex-wrap: wrap;
            height: 40px;
            align-items: center;
            margin-right: 25px;
            min-width: 120px;
            border: 1px solid #999;
            margin-bottom: 10px;
            border-radius: 5px;
            padding: 0 15px;
            &:first-of-type{
                margin-left: 0;
            }
            .stone_name{
                padding: 0 7px;
            }
            .car_number{
                padding: 0 7px;
            }
        }
`;

export default LineUp;