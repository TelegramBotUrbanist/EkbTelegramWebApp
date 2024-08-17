import React, {useMemo} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAtomValue} from "jotai";
import {collectionsAtom} from "../Main/components/CollectionSlider/slider.atoms.ts";
import {eventCollectionsAtom} from "../Events/events.atoms.ts";
import {useLoadableAtom} from "../../hooks/useLoadableAtom.ts";
import ImageSlider from "../../components/ImageSlider";
import {selectionInfoAtom} from "./selection.atom.ts";
import Loader from "../../shared/Loader";
import {SelectionInfoResponse} from "./selection.types.ts";
import MainInfoComponent from "../Establishment/components/Details/components/MainInfo";
import './selection.scss'
import '../Establishment/components/Details/components/Description/Description.scss';
import ContentBlock from "./components/ContentBlock";


const Index = () => {
    const {type,id} = useParams()
    const selectionAtom = useLoadableAtom(selectionInfoAtom)
    const navigate = useNavigate()
    const selection = useMemo(()=>selectionAtom.data as SelectionInfoResponse,[selectionAtom])
    if(selectionAtom.loading) return <Loader/>
    return (
        <div>
            <ImageSlider onClose={()=>navigate('..')} images={[selection.mainImg].map(el=>el.url)}/>
            <div className={'selection_container'}>
                <MainInfoComponent  title={selection.title}/>
                <div className={'description'}>{selection.description}</div>
                <div className={'contentObjects'}>
                    {selection.contentObjects.map(el=><ContentBlock contentBlock={el}/>)}
                </div>
            </div>

        </div>
    );
};

export default Index;