import React from 'react';
import { ReactComponent as BadSmile } from "./../assets/images/useful/svg/bad-smile.svg";

const EmptyBlock = (props) => {
    return (
        <div className="c-empty-block">
            <div className="c-empty-block__ico">
                <BadSmile />
            </div>
            <div className="c-empty-block__desc">
                <span className="c-empty-block__text">У вас пока нет добавленных детей.</span>
                <span className="c-empty-block__text">Добавьте данные о своих детях.</span>
            </div>
        </div>
    );
}

export default EmptyBlock;