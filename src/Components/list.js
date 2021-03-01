import React from 'react';
import {Container, ListItem, ContainerList, Text, ContainerButton } from './list.style';
import { Input, List, Switch, Button } from 'antd';

const ListData = ({
    list,
    filterAscAndDesc,
    ascOrDesc,
    setShow,
    show,
    edit,
    editItem,
    setEdit,
    deleteItem,
}) => {
    return (
        <Container>
            <ListItem  
                size="large"
                bordered={true}
                loading={list ? false : true}
                dataSource={filterAscAndDesc(ascOrDesc)}
                renderItem={
                    item => 
                        <List.Item key={item.id}>
                        <Container>
                            <Switch
                                onClick={() => setShow(!show)}
                            />
                            <ContainerList>
                                <Text show={!show}>{item.list}</Text>
                            </ContainerList>
                                <ContainerButton>
                                    {edit 
                                        ?
                                            <>
                                                <Input  placeholder="Add Todo" onChange={(e) => editItem(e,item)}/>
                                                <Button onClick={() => setEdit(!edit)}>Valid</Button>
                                            </>
                                        :
                                                <Button type="primary" onClick={() => setEdit(!edit)}>Edit</Button>
                                    }
                                </ContainerButton>
                                <ContainerButton>
                                    <Button type="danger" onClick={() => deleteItem(item)}>Delete</Button>   
                                </ContainerButton>
                        </Container>
                        </List.Item>
                }
            />
            </Container>
    )
}

export default ListData