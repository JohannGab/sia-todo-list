import React, { useState } from 'react'
import {
    StyledHome,
    ContainerAddOrSearch,
    AddOrSearch,
    ContainerButtonFilter,
    StyledChangePage
} from './home.style';
import { Space, Button } from 'antd';
import DATA from '../Constant/data'
import Title from '../Components/title'
import Search from '../Components/search'
import AddList from '../Components/addList';
import ListData from '../Components/list';
import { Link } from 'react-router-dom';

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

/////////////////////////******** Sans Json serveur ********/////////////////////////

const Home = () => {
const [list, setList] = useState(DATA)
const [ascOrDesc, setAscOrDesc] = useState('no filter')
const [edit, setEdit] = useState(false)
const [completed, setCompleted] = useState(true)
const [postList, setPostList] = useState(true)
const [newPost, setNewPost] = useState('')
const [defautList, setDefaultList] = useState(DATA)
const [defaultModal, setDefaultModal] = useState(DATA)

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
    if(value === false) {
        return list.sort(compareAsc)
    } else if (value === true) {
        return list.sort(compareDesc)
    } else if (value === 'no filter'){
        return list.sort(noFiltre)
    } else if (value === 'DONE') {
        return list.filter(completed => completed.completed).sort(CompareDone)
    } else if (value === 'UNDONE') {
        return list.filter(completed => !completed.completed).sort(CompareUndone)
    } else {
        return list
    }
}

const addItem = () => {
    const newItem = [...list, {id: new Date().valueOf(), list: newPost, completed: false}];
    setList(newItem);
    setDefaultList(newItem)
}

const editItem = (e,value) => {
    let newItem = list.filter(item => item !== e)
    const index = newItem.indexOf(value)
    newItem[index] = {id: value.id, list: e ? e.target.value : value.list, completed: value.completed}
    setDefaultModal(newItem)
}

const saveEdit = () => {
    setList(defaultModal)
    setDefaultList(defaultModal)
} 

const editCompleted = (e,value) => {
    let newItem = list.filter(item => item !== e)
    const index = newItem.indexOf(value)
    newItem[index] = {id: value.id, list: value.list, completed: e}
    setList(newItem)
    setDefaultList(newItem)
}

const deleteItem = (e) => {
    let remove = list.filter(item => item !== e)
    setList(remove)
    setDefaultList(remove)
}
    
    return (
        <StyledHome>
            <Title text={'Todo List'}/>
            {!edit &&
            <Space direction="vertical">
                {postList 
                    ?
                        <Search onSearch={onSearch}/>
                    :
                        <AddList setNewPost={setNewPost} addItem={addItem}/>
                }
            </Space>}
            {!edit &&
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
            }
                <ListData
                    list={list}
                    filterAscAndDesc={filterAscAndDesc}
                    ascOrDesc={ascOrDesc}
                    edit={edit}
                    editItem={editItem}
                    editCompleted={editCompleted}
                    setEdit={setEdit}
                    saveEdit={saveEdit}
                    deleteItem={deleteItem} 
                />
            {!edit &&
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
            }   
            <StyledChangePage>
                <Button type={"dashed"}>
                    <Link to="/v2">Todo List V2</Link>
                </Button>
            </StyledChangePage>
        </StyledHome>
    )
}

export default Home