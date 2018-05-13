/**
 *  @jest-environment node
 */


import { switchesService } from '../src/_services/switches.service';
import {restlib} from "../src/_utils/restlib";
import {userService} from "../src/_services/user.service";

import { lib } from '../src/_utils/lib'
import moxios from "moxios";
import axios from "axios/index";
// mock_getEtag
jest.mock('../src/_utils/lib');

let token;

beforeAll(() => {
    restlib.setBaseUrl('http://192.168.9.11');
    userService.login('admin', 'root').then(user => {
        token = user.data.replace('{"quinton":"', '').replace('"', '');
    });

    lib.ports.getEtag.mockImplementation(() => {
        //return '1516-992899-224835';
        return undefined;
    });
});

describe('switches service', () => {
    test('switches service - getPorts function', () => {

        const spyPortConfig = jest.spyOn(restlib, 'getPortConfig');
        const spyGetEtag = jest.spyOn(lib.ports, 'getEtag')

        expect.assertions(1);

        moxios.stubRequest(/.*/, {
            status: 200,
            responseText: 'hello'
        });

        return switchesService.getPorts().then(data => {
            console.log(data);
            //expect(data).toEqual('hellos');
            expect(spyPortConfig).toHaveBeenCalledTimes(1);
            expect(spyPortConfig).toEqual('hello')
            return data;
        }).catch(err => {
            console.log(err.message)
        });


        // return switchesService.getPorts().then(data => {
        //     console.log(data);
        //     expect(1).toBe(1);
        // }).catch(err => {
        //     console.log(err);
        // })

        // let url = '/api/data/port-config/port';
        //
        // console.log('lib.ports.getEtag(): ' + lib.ports.getEtag())
        //
        // return axios.get(url, {
        //     headers: restlib.header_get(lib.ports.getEtag()),
        //     auth: {'username':'admin', 'password':'root'},
        //     'withCredentials': true,
        //     transformResponse: restlib.parseJson
        // }).then(data => {
        //     console.log(data)
        // }).catch(err => {
        //     console.log(err.message)
        // });

        // return switchesService.getPorts().then(data => {
        //     console.log(data)
        //     //expect(data).toEqual('hellos');
        //     return data;
        // }).catch(err => {
        //     console.log(err.message)
        // });
        //expect(spyGetEtag).toHaveBeenCalledTimes(1);
        //expect(spyPortConfig).toHaveBeenCalledTimes(1);

    });

    // test('switches service - connectPorts function', () => {
    //     expect.assertions(2);
    //     const indexOne = 1; // TODO: what is the correct id?
    //     const indexTwo = 2; // TODO: what is the correct id?
    //
    //     switchesService.connectPorts(indexOne, indexTwo).then((data) => {
    //         // TODO: what connection data comes back?
    //         expect(data).toEqual(
    //             expect.objectContaining({
    //                 prop: expect.any(String)
    //             })
    //         )
    //     });
    //
    //     expect(restlib.editConnection).toHaveBeenCalledTimes(1);
    // });
    //
    // test('switches service - disconnectPorts function', () => {
    //
    //     const index = 1; // TODO: what is the correct id?
    //     switchesService.disconnectPorts(index).then((data) => {
    //         // TODO: test the data returned
    //     });
    //
    //     expect(restlib.deleteConnection).toHaveBeenCalledTimes(1);
    // });
    //
    // test('switches service - getConnections function', () => {
    //     expect.assertions(2);
    //     switchesService.getConnections().then(data => {
    //         // TODO: test the data returned
    //     });
    //
    //     expect(lib.ports.getEtag).toHaveBeenCalledTimes(1).then(data => {
    //         // TODO: test the data returned
    //     });
    //
    //     expect(restlib.getPortConfig).toHaveBeenCalledTimes(1);
    // });
});