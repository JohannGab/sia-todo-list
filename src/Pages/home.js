import React, { useState } from 'react'
import {
    StyledHome,
    Title,
    InputSend,
    Container,
    ContainerAddOrSearch,
    AddOrSearch,
    ContainerList,
    ListItem,
    Text,
    ContainerButton,
    ContainerButtonFilter
} from './home.style';
import { Input, Space, List,Switch, Button } from 'antd';
import DATA from '../Constant/data'

const compareAsc = (a, b) => {
    if (a.list < b.list) {
        return -1;
    }
    if (a.list > b.list ) {
        return 1;
    }
    return 0;
}

const compareDesc = (a, b) => {
    if (a.list < b.list) {
        return +1;
    }
    if (a.list > b.list ) {
        return -1;
    }
    return 0;
}

const noFiltre = (a, b) => {
    if (a.id < b.id) {
        return -1;
    }
    if (a.id > b.id ) {
        return 1;
    }
    return 0;
}

const Home = () => {
const [list, setList] = useState(DATA)
const [show, setShow] = useState(true);
const [ascOrDesc, setAscOrDesc] = useState('no filter')
const [edit, setEdit] = useState(false)
const [postList, setPostList] = useState(true)
const [newPost, setNewPost] = useState('')


const handleSearch = ({ listName = [], value = '' }) => listName
.filter(name => name.list.toLowerCase().indexOf(value.toLowerCase()) !== -1);

const onSearch = (value) => {
    try {
        const res = handleSearch({
            listName: list,
            value
        })
        if (value) {
            setList(res)
        } 
        else {
            return setList(DATA)
        }
        } catch(err) {
            return null
        }
    }

const filterAscAndDesc = (value) => {
try{
    if(value === false) {
        return list.sort(compareAsc)
    } else if (value === true) {
        return list.sort(compareDesc)
    } else if (value === 'no filter'){
        return list.sort(noFiltre)
    }
} catch(error) {
        return console.log(error);
    }
}

const addItem = () => {
    const newItem = [...list, {id: list.length +1, list: newPost}];
    setList(newItem);
}

const editItem = (e,value) => {
    console.log(e.target.value, 'value',value);
    let newItem = list.filter(item => item !== e)
    console.log('newItem ', newItem);
    const index = newItem.indexOf(value)
    newItem[index] = {id: value.id, list: e.target.value}
    
    console.log('newItem', newItem);
        setList(newItem)
}

const deleteItem = (e) => {
    console.log(e);
    let remove = list.filter(item => item !== e)
        setList(remove)
}

    
    return (
        <StyledHome>
            <Title>Todo List</Title>
            <Space direction="vertical">
                {postList 
                    ?
                        <Input 
                            onChange={(e) => onSearch(e.target.value)}
                            placeholder="search Todo" 
                        />
                    :
                        <InputSend>
                            <Input 
                                onChange={(e) => setNewPost(e.target.value)}
                                placeholder="add todo" 
                            />
                            <Button type="primary" htmlType="submit" onClick={()=> addItem()}>Send</Button>
                        </InputSend>
                }
            </Space>
                <ContainerAddOrSearch>
                    <AddOrSearch>
                        <Button 
                            type="primary" 
                            htmlType="button"
                            onClick={()=>setPostList(!postList)}
                        >
                            {!postList ? 'return Search List' : 'Add list ?'}
                        </Button>
                    </AddOrSearch>
                </ContainerAddOrSearch>
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
                                onChange={() => setShow(!show)}
                            />
                            <ContainerList>
                                <Text show={show}>{item.list}</Text>
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
            <ContainerButtonFilter>
                <button onClick={() => setAscOrDesc(!ascOrDesc)}>{ascOrDesc ? 'ASC' : 'DESC'}</button>
                <button onClick={() => setAscOrDesc('no filter')}>no filter</button>
            </ContainerButtonFilter>    
        </StyledHome>
    )
}


export default Home

// <List
// size="large"
// bordered={true}
// loading={DATA ? false : true}
// dataSource={DATA}
// renderItem={item => (
    
//     <>
//             <Space>
//             <Switch
//                 onChange={() => setShow(!show)}
//             />
//             {item.list}
            
//                 <Button type="primary">Edit</Button>
//                 <Button type="danger">Delete</Button>
//         </Space>
//     </>
//     )}
// />