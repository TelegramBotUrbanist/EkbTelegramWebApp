import React from 'react';
import {ContentObject} from "../../selection.types.ts";
import ImageSlider from "../../../../components/ImageSlider";
import './block.scss'
import MainInfoComponent from "../../../Establishment/components/Details/components/MainInfo";
import Button from "../../../../shared/Button";
import {Link} from "react-router-dom";
interface IProps{
    contentBlock: ContentObject
}
const Index:React.FC<IProps> = ({contentBlock}) => {
    const pageTypeToNavigate = contentBlock.type === 'FOOD_ESTABLISHMENT' ? 'establishment':'events'
    //TODO: Заменить на получение айди из объекта
    const idToNavigate = 0
    return (
        <div>
            <div className={'selection_block'}>
                <ImageSlider images={[contentBlock.mainImg.url]} isLiked={contentBlock.inFavorites} canLike={true}/>
                <MainInfoComponent title={contentBlock.title} mainCategory={contentBlock.categoryInfoDto}
                                   innerCategory={contentBlock.innerCategoryInfo} costLevel={contentBlock?.costLevel}
                                   ageLevel={contentBlock?.ageLimit}/>
                <div className={'description'}>{contentBlock.description}</div>
                <div className={'button-container'}>
                    <Link to={`${pageTypeToNavigate}/${idToNavigate}`}>
                        <Button type={'secondary'}>Подробнее</Button>

                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Index;