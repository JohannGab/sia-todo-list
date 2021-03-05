import React, { useState } from 'react';
import {Container, Label, ListItem, ContainerList, Text, EditModal, ContainerButton } from './list.style';
import { Input, List, Switch, Button } from 'antd';

/////////////////////////******** Avec Json serveur ********/////////////////////////

const ListDataV2 = ({
    list,
    filterAscAndDesc,
    ascOrDesc,
    edit,
    editItem,
    editCompleted,
    setEdit,
    deleteItem,
}) => {
const [selectItem ,setSelectItem] = useState('')
const [editList, setEditList] = useState('')

const activateStyle = (value) => {
    if(value === true) {
        return 'line-through'
    } else {
        return 'none'
    } 
}

const saveEdit = (id, list) => {
    editItem(id, list)
} 

    return (
        <Container>
            {edit &&
                <EditModal>
                    <Label>Edit Todo</Label>
                    <Input  
                        placeholder="Edit Todo" 
                        defaultValue={selectItem.list} 
                        onChange={(e) => setEditList(e.target.value)}
                        style={{marginBottom: '1rem'}}
                    />
                    <Button 
                        type="primary" 
                        onClick={() => saveEdit(selectItem.id, editList) & setEdit(!edit)}
                    >
                        Add Todo List
                    </Button>
                </EditModal>
            }
            <ListItem  
                style={edit ? {display: 'none'}:  null}
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
                                onClick={() => editCompleted(item.id, item.completed)}
                            />
                            <ContainerList>
                                <Text show={activateStyle(item.completed)}>{item.list}</Text>
                            </ContainerList>
                                <ContainerButton>
                                    <Button type="primary" onClick={() => setEdit(!edit) & setSelectItem(item)}>Edit</Button>
                                </ContainerButton>
                                <ContainerButton>
                                    <Button type="danger" onClick={() => deleteItem(item.id)}>Delete</Button>   
                                </ContainerButton>
                        </Container>
                        </List.Item>
                }
            />
            </Container>
    )
}

export default ListDataV2;