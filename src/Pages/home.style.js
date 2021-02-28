import styled from 'styled-components';
import {List} from 'antd';

export const StyledHome = styled.div`
    display: block;
    text-align: center;
`

export const Title = styled.h1`
    font-size: 3rem;
    margin: 1rem 0;
`

export const InputSend = styled.div`
    display: flex;
`

export const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`

export const ContainerAddOrSearch = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1rem;
`

export const AddOrSearch = styled.div`
`

export const ContainerList = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
`

export const ListItem = styled(List)`
    width: 60%;
    margin-top: 2rem;
    background-color: #b3d3e8;
`

export const Text = styled.p`
    margin-left: 1rem;
    text-decoration: ${({show}) => show ? null : 'line-through'};
`

export const ContainerButton = styled.div`
    margin: 0 0.2rem;
`

export const ContainerButtonFilter = styled.div`
    margin-top: 2rem;
`