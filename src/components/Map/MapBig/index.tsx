import React from "react";
import { YMaps, Map, ZoomControl, GeolocationControl, Clusterer } from "@pbe/react-yandex-maps";
import { MapLocation } from '../../../pages/Map/map.types.ts';
import { CustomPlacemark } from './CustomPlacemark.tsx';
import PlacemarkModal from './PlacemarkModal';

interface MapComponentProps {
  locations: MapLocation[];
  center?: [number, number];
  zoom?: number;
}

interface MapComponentState {
  iconLayoutTemplate: any;
  clusterLayoutTemplate: any;
  ymaps: any;
  selectedPlace: MapLocation | null;
  isModalOpen: boolean;
}

export class MapComponent extends React.Component<MapComponentProps, MapComponentState> {
  constructor(props: MapComponentProps) {
    super(props);
    this.state = {
      iconLayoutTemplate: null,
      clusterLayoutTemplate: null,
      ymaps: null,
      selectedPlace:null,
      isModalOpen:false,
    };
    // Привязываем метод к контексту компонента
    this.handlePlacemarkClick = this.handlePlacemarkClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);



  }

  componentDidMount() {
    window.handlePlacemarkClick = this.handlePlacemarkClick;
  }

  componentWillUnmount() {
    delete window.handlePlacemarkClick;
  }


  handlePlacemarkClick(placeId: number): void {
    console.log('handlePlacemarkClick called with id:', placeId);
    const place = this.props.locations.find(loc => loc.id === placeId);
    if (place) {
      requestAnimationFrame(() => {
        this.setState({
          selectedPlace: place,
          isModalOpen: true
        });
      });
    }
  }
  // Определяем глобальную функцию
  handleModalClose() {
    this.setState({
      isModalOpen: false,
      selectedPlace: null
    });
  }




  onApiAvaliable = (ymaps: any) =>  {
    // Шаблон для обычной метки
    const iconLayoutTemplate = ymaps.templateLayoutFactory.createClass(
      `<div  class="placemark-layout">
                <div class="placemark-image-container">
                    <img src="{{ properties.iconContent.image.url}}" class="placemark-image"/>
                </div>
                <div onclick="()=>console.log(123)" class="placemark-content">
                    <div class="placemark-header">
                        <span class="placemark-title">{{ properties.iconContent.title }}</span>
                        <span class="interpunct">·</span>
                        <span class="placemark-rating">{{ properties.iconContent.rating }}</span>
                    </div>
                    <div class="placemark-category">{{ properties.iconContent.categoryInfoDto.title }}</div>
                </div>
            </div>`,
      {
        build: function() {
          this.constructor.superclass.build.call(this);
          const element = this.getParentElement();
          if (element) {
            element.style.cursor = 'pointer';
          }
        }
      }
    );

    // Шаблон для кластера
    const clusterLayoutTemplate = ymaps.templateLayoutFactory.createClass(
      `<div class="cluster-layout">
        <div class="cluster-content">
          <span class="cluster-count">{{ properties.geoObjects.length }}</span>
        </div>
      </div>`
    );

    // Добавляем стили
    const style = document.createElement('style');
    style.textContent = `
            .placemark-layout {
                display: flex;
                align-items: center;
                background: transparent;
                padding: 8px;
                border-radius: 12px;
                min-width: 200px;
                position: relative;
            }

            .placemark-layout::after {
                content: '';
                position: absolute;
                bottom: -6px;
                left: 50%;
                transform: translateX(-50%);
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-top: 6px solid white;
            }

            .placemark-image-container {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                border: 4px solid white;
                overflow: hidden;
                margin-right: 2px;
                flex-shrink: 0;
                position:relative;
                z-index:1;
            }
            .interpunct{
              margin-right:4px;
              align-self:center;
              font-size:20px;
              color:#3C3C4399;
            }

            .placemark-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .placemark-content {
                flex-grow: 1;
                border-radius: 12px;
                border-bottom-left-radius: 0px;
                border-top-left-radius: 0px;
                padding: 4px 8px 4px 16px;
                background-color: white;
                min-width: 0;
                left:-16px;
                position:relative;
                z-index:0;
            }

            .placemark-header {
                display:flex;
                flex-direaction:row;
                align-items:center;
         
            }

            .placemark-title {
                font-weight: 500;
                font-size: 16px;
                color: #333;
                margin-right: 2px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .placemark-rating {
                font-size: 14px;
                color: #666;
                white-space: nowrap;
            }

            .placemark-category {
                font-size: 14px;
                color: #999;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            /* Стили для кластера */
            .cluster-layout {
                background: none;
                position: relative;
            }

            .cluster-content {
                background: #4A67FF;
                border: 3px solid #FFFFFF;
                border-radius: 50%;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            }

            .cluster-count {
                color: #FFFFFF;
                font-size: 14px;
                font-weight: 600;
            }
        `;
    document.head.appendChild(style);

    this.setState({
      iconLayoutTemplate,
      clusterLayoutTemplate,
      ymaps
    });
  }

  render() {
    const { locations, center = [56.838866, 60.605269], zoom = 15 } = this.props;
    const { iconLayoutTemplate, clusterLayoutTemplate, selectedPlace, isModalOpen } = this.state;

    return (
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <YMaps query={{ lang: "ru_RU", load: "package.full" }}>
          <Map
            defaultState={{
              center,
              zoom,
              controls: []
            }}
            width="100%"
            height="110%"
            modules={["templateLayoutFactory", "option.presetStorage"]}
            onLoad={(ymaps) => this.onApiAvaliable(ymaps)}
          >
            <Clusterer
              options={{
                // Группируем метки если они находятся на расстоянии менее 60 пикселей друг от друга
                gridSize: 220,
                // clusterIconLayout: clusterLayoutTemplate,
                // clusterBalloonContentLayout: "cluster#balloonCarousel",
                // clusterOpenBalloonOnClick: false,
                // clusterDisableClickZoom: false,
                minClusterSize: 2,
                zoomMargin: 30,
              }}
            >
              {locations.map(location => (
                <CustomPlacemark
                  key={location.id}
                  location={location}
                  iconLayoutTemplate={iconLayoutTemplate}
                  onClick={()=>this.handlePlacemarkClick(location.id)}
                />
              ))}
            </Clusterer>

            <ZoomControl

              options={{
                position: { right: 10, top:360  },
                adjustMapMargin:true,
                size:'small'
              }}
            />
            <GeolocationControl
              options={{
                position: { right: 10, top: 484 }
              }}
            />
          </Map>
        </YMaps>
        {selectedPlace && (<div id={'test'}>
          <PlacemarkModal
            isOpen={isModalOpen}
            onClose={this.handleModalClose}
            placeData={selectedPlace}
          />
        </div>)}
      </div>
    );
  }
}

export default MapComponent;