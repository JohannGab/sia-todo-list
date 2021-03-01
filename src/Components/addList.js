import React from 'react';
import {StyledAddList} from './addList.style';
import { Input, Button } from 'antd';

const AddList = ({setNewPost, addItem}) => {
    return (
        <StyledAddList>
            <Input 
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="add todo"
                maxLength="250" 
            />
            <Button type="primary" htmlType="submit" onClick={()=> addItem()}>Send</Button>
        </StyledAddList>
    )
}

export default AddList