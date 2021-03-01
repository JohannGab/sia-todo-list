import React from 'react';
import {StyledTitle ,TextTitle} from './title.style'

const Title = ({text}) => {
    return (
        <StyledTitle>
            <TextTitle>{text}</TextTitle>
        </StyledTitle>
    )
}

export default Title;