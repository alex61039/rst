import React from 'react';
import SymbolDefs from './../assets/images/useful/svg/theme/symbol-defs.svg';

const IconMail = () => (
    <svg width="1em" height="1em" className="icon icon-mail ">
        <use xlinkHref={`${SymbolDefs}#icon-mail`}></use>
    </svg>
);

const MailSent = (props) => (
    <div className="main-content">
        <div className="c-password-recovery">
            <h1 className="e-title--lg">{props.title}</h1>
            <div className="c-password-recovery__ico">
                <IconMail />
            </div>
            <div className="c-password-recovery__info">
                <span className="c-password-recovery__txt">На ваш электронный адрес</span>
                <b className="c-password-recovery__email">{props.email}</b>
                <span>отправлено письмо. Перейдите по ссылке из полученного письма. Если письмо не пришло, проверьте папку «Спам». </span>
            </div>
        </div>
    </div>
);

export default MailSent;