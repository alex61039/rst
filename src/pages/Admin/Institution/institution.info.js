import React from 'react';

const InstitutionInfoItem = (props) => (
    <li class="c-institutions-page-info__item">
        <span class="c-institutions-page-info__title">{props.name}:</span>
        <span class="c-institutions-page-info__desc">{props.value}</span>
    </li>
);

const InstitutionInfo = (props) => {
    const { data } = props;
    return (
        <div class="c-institutions-page__info c-institutions-page-info">
            <ul class="h-reset-list c-institutions-page-info__list">
                <InstitutionInfoItem name="Описание" value={data.description} />
                <InstitutionInfoItem name="Статус" value={data.education} />
                <InstitutionInfoItem name="Адрес" value={data.address} />
                <InstitutionInfoItem name="Email" value={data.email} />
                <InstitutionInfoItem name="Телефон" value={data.phone} />
            </ul>
        </div>
    );
}

export default InstitutionInfo;