import React, { useState } from 'react';
import {Container, Label, ListItem, ContainerList, Text, EditModal, ContainerButton } from './list.style';
import { Input, List, Switch, Button } from 'antd';

const ListData = ({
    list,
    filterAscAndDesc,
    ascOrDesc,
    edit,
    editItem,
    editCompleted,
    setEdit,
    saveEdit,
    deleteItem,
}) => {
const [selectItem ,setSelectItem] = useState('')

const activateStyle = (value) => {
    if(value === true) {
        return 'line-through'
    } else {
        return 'none'
    } 
}

    return (
        <Container>
            {edit &&
                <EditModal>
                    <Label>Edit Todo</Label>
                    <Input  
                        placeholder="Edit Todo" 
                        defaultValue={selectItem.list} 
                        onChange={(e) => editItem(e, selectItem)}
                        style={{marginBottom: '1rem'}}
                    />
                    <Button 
                        type="primary" 
                        onClick={() => saveEdit() & setEdit(!edit)}
                    >
                        Add Todo List
                    </Button>
                </EditModal>
            }
            <ListItem  
                style={edit ? {display: 'none'}:  null}
                size="small"
                bordered={true}
                loading={list.length === 0 ? true : false}
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
                                    <Button type="primary" onClick={() => setEdit(!edit) & setSelectItem(item)}>Edit</Button>
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