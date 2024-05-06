/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { PublicationList } from './PublicationList';
import { Global } from '../../helpers/Global';
export const Feed = () => {
    const token = localStorage.getItem('token');
    const [publications, setPublications] = useState([]);
    const [maxPage, setMaxPage] = useState(0);
    const [page, setPage] = useState(1);

    const getPublications = async (nextPage = 1, isNew = false) => {
        const urlPublications = Global.baseUrlApi + '/publication/feed/' + nextPage;
        if(isNew){
            setPage(1);
        }
        let requestPublications = await fetch(urlPublications, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
        let responsePublications = await requestPublications.json();
        console.info(responsePublications)
        if (responsePublications.status == 200) {
            setPublications(responsePublications.paginated);
            setMaxPage(responsePublications.pages);
        }
    }

    useEffect(() => {
        getPublications();
    }, []);
    return (
        <section className="layout__content">

            <header className="content__header">
                <h1 className="content__title">Timeline</h1>
                <button className="content__button" onClick={()=>getPublications(1, true)}>Mostrar nuevas</button>
            </header>
            <PublicationList page={page} setPage={setPage} maxPage={maxPage} getPublications={getPublications} publications={publications} />

        </section>


    )
}
