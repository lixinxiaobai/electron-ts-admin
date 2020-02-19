import * as React from 'react';
import styled from "styled-components";

const SoftTitle = styled.div`
    margin-left: 25px;
    font-size: 18px;
    font-weight: bold;
    color: #1890ff;
`;

let HeaderLeft:React.FC = ()=>{
    return <SoftTitle>销售车辆过磅管理软件网络版【过磅端】</SoftTitle>
};

export default HeaderLeft;