import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import Menu from './menu';
import AdminMenu from './adminMenu';
import WorkerMenu from './workerMenu';
import { argumentPlaceholder } from '@babel/types';

const TopMenu = (props) => {
    const [selected, setSelected] = useState("Личный");
    const auth = useSelector(state => state.auth)
    console.log(auth)
    useEffect(() => {
        if (window.location.pathname.indexOf("structure") !== -1) {
            setSelected("Админ");
        } else if (window.location.pathname.indexOf("worker") !== -1) {
            setSelected("Рабочий");
        } else {
            setSelected("Личный");
        }
    })

    return (
        <div className="left-side">
            <div className="mobile-burger">
                <div className="mobile-burger__head">
                    <button type="button" className="mobile-burger__btn js-close-mmenu">
                        <span></span>
                    </button>
                </div>
                <div className="mobile-burger__content">
                    <div className="c-cabinet">
                        <h3 className="e-title--sm">Кабинет</h3>
                        <button type="button" className="c-cabinet__btn">
                            {selected}
                            <div className="c-cabinet__list">
                                <div className="c-cabinet__items">
                                    <a href="/profile" className="c-cabinet__item" onClick={() => setSelected("Личный")}>Личный</a>
                                    {
                                        (auth.isEmployeeRole || auth.isSelfEmployeeRole) &&
                                        <a href="/worker" className="c-cabinet__item" onClick={() => setSelected("Рабочий")}>Рабочий</a>
                                    }
                                    {
                                        auth.isSuperAdminRole && <a href="/structure" className="c-cabinet__item" onClick={() => setSelected("Админ")}>Админ</a>
                                    }
                                </div>
                            </div>
                        </button>
                    </div>
                    {
                        selected === "Личный" ? <Menu /> : selected === "Рабочий" ? <WorkerMenu isInstitutionDisplay={auth.isEmployeeRole} /> : <AdminMenu />
                    }
                </div>
            </div>
        </div>);
};

export default TopMenu;