import React from 'react';
import {Container, ListItem, ContainerList, Text, ContainerButton } from './list.style';
import { Input, List, Switch, Button } from 'antd';

const ListData = ({
    list,
    filterAscAndDesc,
    ascOrDesc,
    edit,
    editItem,
    editCompleted,
    setEdit,
    deleteItem,
}) => {
const activateStyle = (value) => {
    if(value === true) {
        return 'line-through'
    } else {
        return 'none'
    } 
}

    return (
        <Container>
            <ListItem  
                size="small"
                bordered={true}
                loading={list ? false : true}
                dataSource={filterAscAndDesc(ascOrDesc)}
                renderItem={
                    item => 
                        <List.Item key={item.id}>
                        <Container>
                            <Switch
                                defaultChecked={item.completed}
                                onClick={(e) => editCompleted(e,item)}
                            />
                            <ContainerList>
                                <Text show={activateStyle(item.completed)}>{item.list}</Text>
                            </ContainerList>
                                <ContainerButton>
                                    {edit 
                                        ?
                                            <>
                                                <Input  placeholder="Add Todo" onChange={(e) => editItem(e,item)}/>
                                                <Button type="primary" onClick={() => setEdit(!edit)}>Add Todo List</Button>
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