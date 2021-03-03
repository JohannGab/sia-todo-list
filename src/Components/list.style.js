import styled from 'styled-components';
import {List} from 'antd';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
        @media screen and (max-width: 640px) {
            font-size: 0.8rem
        }
`
export const Label = styled.label`
    font-weight: 500;
`

export const ListItem = styled(List)`
    width: 60%;
    margin-top: 2rem;
    background-color: #b3d3e8;
        @media screen and (max-width: 640px) {
            width: 95%;
        }
`

export const ContainerList = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
`

export const Text = styled.p`
    margin-left: 1rem;
    text-decoration: ${({show}) => show};
    padding-top: 0.8rem;
    font-weight: 400;
    text-transform: capitalize;
`

export const EditModal = styled.div`
    display: block;
`

export const ContainerButton = styled.div`
    margin: 0 0.2rem;
    @media screen and (max-width: 640px) {
            button {
                padding: 0 0.4rem;
            }
        }
`