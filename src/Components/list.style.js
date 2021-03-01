import styled from 'styled-components';
import {List} from 'antd';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`
export const ListItem = styled(List)`
    width: 60%;
    margin-top: 2rem;
    background-color: #b3d3e8;
`

export const ContainerList = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
`

export const Text = styled.p`
    margin-left: 1rem;
    text-decoration: ${({show}) => show ? 'line-through' : 'none'};
`

export const ContainerButton = styled.div`
    margin: 0 0.2rem;
`