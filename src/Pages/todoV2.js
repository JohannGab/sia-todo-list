import React, { useEffect, useState } from 'react';
import {
    StyledHome,
    ContainerAddOrSearch,
    AddOrSearch,
    ContainerButtonFilter
} from './home.style';
import { Space, Button } from 'antd';
import Title from '../Components/title';
import Search from '../Components/search';
import AddList from '../Components/addList';
import ListData from '../Components/listV2';

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


/////////////////////////******** Avec Json serveur ********/////////////////////////

const Home = () => {
const [list, setList] = useState([])
const [ascOrDesc, setAscOrDesc] = useState('no filter')
const [edit, setEdit] = useState(false)
const [completed, setCompleted] = useState(true)
const [postList, setPostList] = useState(true)
const [newPost, setNewPost] = useState('')
const [defautList, setDefaultList] = useState([])

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

useEffect((id) => {
    getItem()
}, [])

const getItem = () => {
    fetch('http://localhost:3001/list')
    .then((response) => response.json())
    .then((json) => [setList(json), setDefaultList(json)])
    .catch(error => (
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message)
    ))
}

const postItem = ({id, list, completed}) => {
    fetch('http://localhost:3001/list', {
        method: 'POST',
        body: JSON.stringify({
            id,
            list,
            completed
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((json) => json)
        .catch(error => (
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message)
        ))
}

const addItem = () => {
    const newItem = {id: new Date().valueOf(), list: newPost, completed: false};
    postItem(newItem)
    getItem()
    setPostList(!postList)
}

const editItem = (id, list) => {
    fetch(`http://localhost:3001/list/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            list
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})
    .then((response) => response.json())
    .then((json) => json)
    .then(() => getItem())
    .catch(error => (
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message)
    ))
}

const editCompleted = (id, value) => {
    fetch(`http://localhost:3001/list/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            completed: !value,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => json)
        .then(() => getItem())
        .catch(error => (
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message)
        ))
}

const deleteItem = (id) => {
    fetch(`http://localhost:3001/list/${id}`, {
        method: 'DELETE',
    }, window.location.reload())
    .catch(error => (
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message)
    ))
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
        </StyledHome>
    )
}

export default Home