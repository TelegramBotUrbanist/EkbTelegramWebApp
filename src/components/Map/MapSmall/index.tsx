import React from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

const mapState = {
    zoom: 12
};

export class MapComponent extends React.Component<any,any> {
    constructor(props) {
        super(props);
        this.state = {
            iconLayoutTemplate: null,
            ymaps: null
        };
    }

    onApiAvaliable(ymaps) {
        // Создаем шаблон для кастомной метки, используя pointTitle из props
        const iconLayoutTemplate = ymaps.templateLayoutFactory.createClass(
            `<div style="display: flex;">
                <img src="https://cdn-icons-png.flaticon.com/128/3699/3699580.png" style="width: 30px; height: 30px;" />
                <div style="margin-left: 8px; padding: 6px; position: absolute; left: 24px; top: 4px; border-radius: 16px; max-width: 140px; min-width: 106px; color: #000; font-size: 12px; font-weight: 500; background-color: #fff"><span>${this.props.pointTitle}</span></div>
            </div>`
        );
        this.setState({ iconLayoutTemplate, ymaps });
    }

    render() {
        const { latitude, longitude } = this.props;

        return (
            <div style={{ width: "100%", position:"relative" }}>
                <YMaps query={{ lang: "ru_RU", load: "package.full" }}>
                    <Map
                        style={{width:'348px',height:'220px'}}
                        defaultState={{ center: [latitude, longitude], zoom: mapState.zoom, controls:[] }}
                        modules={["templateLayoutFactory", "option.presetStorage"]}
                        instanceRef={(ref) => {
                            if (ref) {
                                ref.behaviors.disable(['scrollZoom', 'multiTouch', 'drag', 'dblClickZoom']);
                            }
                        }}
                        onLoad={(ymaps) => this.onApiAvaliable(ymaps)}
                    >
                        {this.state.iconLayoutTemplate && (
                            <Placemark
                                geometry={[latitude, longitude]} // Используем координаты из props
                                options={{
                                    iconLayout: this.state.iconLayoutTemplate, // Кастомный шаблон метки
                                    iconShape: { type: 'Rectangle', coordinates: [[-15, -15], [15, 15]] } // Окно кликабельности
                                }}
                            />
                        )}
                    </Map>
                    {/* Перекрывающий блок снизу */}
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '36px',
                        backgroundColor: 'white',
                        pointerEvents: 'none'
                    }} />
                </YMaps>
            </div>
        );
    }
}

export default MapComponent;
