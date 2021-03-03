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

const CompareDone = (a, b) => {
    if (a.completed < b.completed) {
        return +1;
    }
    if (a.completed > b.completed ) {
        return -1;
    }
    return 0;
}

const CompareUndone = (a, b) => {
    if (a.completed < b.completed) {
        return -1;
    }
    if (a.completed > b.completed ) {
        return +1;
    }
    return 0;
}


const Home = () => {
const [list, setList] = useState(DATA)
const [ascOrDesc, setAscOrDesc] = useState('no filter')
const [edit, setEdit] = useState(false)
const [completed, setCompleted] = useState(true)
const [postList, setPostList] = useState(true)
const [newPost, setNewPost] = useState('')
const [defautList, setDefaultList] = useState(DATA)

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
            return setList(defautList);
        }
        } catch(err) {
            return console.error(err);
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
    } else if (value === 'DONE') {
        return list.sort(CompareDone)
    } else if (value === 'UNDONE') {
        return list.sort(CompareUndone)
    } else {
        return list
    }
} catch(error) {
        return console.error(error);
    }
}

const addItem = () => {
    try {
        const newItem = [...list, {id: new Date().valueOf(), list: newPost, completed: false}];
        setList(newItem);
        setDefaultList(newItem)
    } catch(error) {
        return console.error(error);
    }
}

const editItem = (e,value) => {
    try {
        let newItem = list.filter(item => item !== e)
        const index = newItem.indexOf(value)
        newItem[index] = {id: value.id, list: e.target.value, completed: value.completed}
        setList(newItem)
        setDefaultList(newItem)
    } catch(error) {
        return console.error(error);
    }
}

const editCompleted = (e,value) => {
    try {
        let newItem = list.filter(item => item !== e)
        const index = newItem.indexOf(value)
        newItem[index] = {id: value.id, list: value.list, completed: e}
        setList(newItem)
        setDefaultList(newItem)
    } catch(error) {
        return console.error(error);
    }
}

const deleteItem = (e) => {
    try {
        let remove = list.filter(item => item !== e)
        setList(remove)
        setDefaultList(remove)
    } catch(error) {
        return console.error(error);
    }
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
                    edit={edit}
                    editItem={editItem}
                    editCompleted={editCompleted}
                    setEdit={setEdit}
                    deleteItem={deleteItem} />
            <ContainerButtonFilter>
                <Button
                    type={ascOrDesc ? 'primary' : 'dashed'}
                    onClick={() => setAscOrDesc(!ascOrDesc)}>
                        {ascOrDesc ? 'ASC' : 'DESC'}
                </Button>
                <Button
                    style={{margin: '0 1rem'}}
                    type={'primary'}
                    onClick={() => setAscOrDesc('no filter') & setCompleted(false)}>
                        no filter
                </Button>
                <Button
                    type={completed ? 'primary' :'dashed' 
                            && ascOrDesc === 'no filter' ? setCompleted(!completed) : null
                        }
                    onClick={() => setAscOrDesc(completed ? 'DONE' : 'UNDONE') & setCompleted(!completed)}>
                        {completed ? 'DONE' : 'UNDONE'}
                </Button>
            </ContainerButtonFilter>    
        </StyledHome>
    )
}

export default Home