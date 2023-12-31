import React from 'react';
import Form from "react-bootstrap/Form";
import {Button, Modal} from "react-bootstrap";
import Map from "ol/Map";
import {Tile as TileLayer} from "ol/layer";
import {OSM} from "ol/source";
import View from "ol/View";
import {fromLonLat, toLonLat} from "ol/proj";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import {Draw} from "ol/interaction";
import {useDispatch} from "react-redux";
import {addStatement} from "../../redux/slices/statements";
import {useLocation} from "react-router-dom";

const CreateModal = ({open, handleClose}) => {
    const [address, setAddress] = React.useState('');
    const [location, setLocation] = React.useState(null);
    const [priority, setPriority] = React.useState();
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [accidentType, setAccidentType] = React.useState('');
    const [applicant, setApplicant] = React.useState('');
    const url = useLocation();

    const [validated, setValidated] = React.useState(false);

    const dispatch = useDispatch();

    const mapElement = React.useRef(null);
    React.useEffect(() => {
        const map = new Map({
            target: mapElement.current,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view: new View({
                center: fromLonLat([39.683536334334974, 47.22365071826664]),
                zoom: 12,
            }),
        });

        const source = new VectorSource();
        const layer = new VectorLayer({
            source: source,
        });
        map.addLayer(layer);

        const draw = new Draw({
            source: source,
            type: 'Point',
        });
        map.addInteraction(draw);


        draw.on('drawend', (event) => {
            const feature = event.feature;
            const point = feature.getGeometry().getCoordinates();
            const lonLat = toLonLat(point);
            setLocation(lonLat);
        });
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === true && location) {
            const newStatement = {
                id: Date.now(),
                address,
                location,
                accidentType,
                priority,
                applicant,
                phoneNumber
            };

            dispatch(addStatement(newStatement));

            setAddress('');
            setLocation(null);
            setPriority('');
            setPhoneNumber('');
            setAccidentType('');
            setApplicant('');
            handleClose();
        }

        if (location == null) {
            alert("Не задудьте выбрать локацию");
        }
        setValidated(true);
    }

    const onLocation = (coordinate) => {
        setLocation(coordinate)
    }

    return (
        <Modal
            show={url.pathname || open}
            onHide={handleClose}
            aria-labelledby="modal-modal-title"
            size={"xl"}
            aria-describedby="modal-modal-description"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Создание заявки
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate={validated} onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formAddress">
                        <Form.Label>Адрес</Form.Label>
                        <Form.Control
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            type="text"
                            placeholder="Введите адрес"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formLocation">
                        <Form.Label>Локация</Form.Label>
                        <div
                            ref={mapElement}
                            style={{height: '400px'}}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAccidentType">
                        <Form.Label>Тип аварии</Form.Label>
                        <Form.Control
                            as="select"
                            value={accidentType}
                            required
                            onChange={(e) => setAccidentType(e.target.value)}
                        >
                            <option>Выбери тип аварии</option>
                            <option value="1">порыв</option>
                            <option value="2">утечка</option>
                            <option value="3">колонка уличная</option>
                            <option value="4">некачественная вода</option>
                            <option value="5">закупорка</option>
                            <option value="6">другое</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPriority">
                        <Form.Label>Приоритет</Form.Label>
                        <Form.Control
                            as="select"
                            value={priority}
                            required
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option>Выбери приоритет</option>
                            <option value="1">незамедлительно</option>
                            <option value="2">высокий</option>
                            <option value="3">средний</option>
                            <option value="4">низкий</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Заявитель</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите имя"
                            value={applicant}
                            required
                            onChange={(e) => setApplicant(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Номер телефона</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите номер телефона"
                            value={phoneNumber}
                            required
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateModal;