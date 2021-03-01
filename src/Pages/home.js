import React, { useState } from 'react'
import {
    StyledHome,
    ContainerAddOrSearch,
    AddOrSearch,
    ContainerButtonFilter
} from './home.style';
import { Space, Button } from 'antd';
import DATA from '../Constant/data'
import Title from '../Components/title'
import Search from '../Components/search'
import AddList from '../Components/addList';
import ListData from '../Components/list';

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
    const newItem = [...list, {id: new Date().valueOf(), list: newPost}];
    setList(newItem);
}

const editItem = (e,value) => {
    let newItem = list.filter(item => item !== e)
    const index = newItem.indexOf(value)
    newItem[index] = {id: value.id, list: e.target.value}
    setList(newItem)
}

const deleteItem = (e) => {
    let remove = list.filter(item => item !== e)
    setList(remove)
}
    
    return (
        <StyledHome>
            <Title text={'Todo List'}/>
            <Space direction="vertical">
                {postList 
                    ?
                        <Search onSearch={onSearch}/>
                    :
                        <AddList setNewPost={setNewPost} addItem={addItem}/>
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
                <ListData
                    list={list}
                    filterAscAndDesc={filterAscAndDesc}
                    ascOrDesc={ascOrDesc}
                    setShow={setShow}
                    show={show}
                    edit={edit}
                    editItem={editItem}
                    setEdit={setEdit}
                    deleteItem={deleteItem} />
            <ContainerButtonFilter>
                <Button onClick={() => setAscOrDesc(!ascOrDesc)}>{ascOrDesc ? 'ASC' : 'DESC'}</Button>
                <Button onClick={() => setAscOrDesc('no filter')}>no filter</Button>
            </ContainerButtonFilter>    
        </StyledHome>
    )
}

export default Home