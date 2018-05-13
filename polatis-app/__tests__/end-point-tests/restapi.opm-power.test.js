/**
 *  @jest-environment node
 */

import { restlib } from '../../src/_utils/restlib';
import { userService } from '../../src/_services/user.service';

import axios from "axios";

jest.unmock('axios');

let token;

beforeAll(() => {
    restlib.setBaseUrl('http://192.168.9.11');
    userService.login('admin', 'root').then(user => {
        token = user.data.replace('{"quinton":"', '').replace('"', '');
    });
});

describe('method tests', () => {

    test('test "method" method returns expected properties/types', () => {
        // expect.assertions(1);
        // return restlib.method(token).then(data => {
        //     let firstElement = data.data['optical-switch:cross-connects'].pair[0];
        //
        //     expect(firstElement).toEqual(
        //         expect.objectContaining({
        //             ingress: expect.any(Number),
        //             egress: expect.any(Number)
        //         })
        //     )
        //
        // }).catch(err => {
        //     console.log(err.message)
        // });
    });

});