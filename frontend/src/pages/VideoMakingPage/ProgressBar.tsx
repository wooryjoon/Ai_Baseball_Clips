import React from 'react';
import styled from 'styled-components';

interface Test {
    width: number;
}

const ProgressBar = styled.div`
    width: 100%;
    height: 30px;
    background-color: #dedede;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.8rem;
    margin-top: 20px;
    overflow: hidden;
`;

const Progress = styled.div<Test>`
    width: ${(props: Test) => props.width}%;
    height: 30px;
    padding: 0;
    text-align: center;
    background-color: skyblue;
    color: #111;
`;

export default function Loading() {
    const maxItem = 5;
    let availableItem = 2;
    return (
        <ProgressBar>
            <Progress width={100 - (availableItem * 100) / maxItem} />
        </ProgressBar>
    );
}
