import React from 'react'
import ProfileStaus from './ProfileStatus'
import {create} from 'react-test-renderer'

describe('ProfileStatus component', () => {
    test('after creation span should be displayed', () => {
        const component = create(<ProfileStaus status="it-Kamasutra"/>)
        const root = component.root
        let span = root.findByType('span')
        expect(span).not.toBeNull()
    })

    test('after creation span should contain correct status', () => {
        const component = create(<ProfileStaus status="it-Kamasutra"/>)
        const root = component.root
        let span = root.findByType('span')
        expect(span.children[0]).toBe('it-Kamasutra')
    })

    test('input should be displayed in editMode instead of span', () => {
        const component = create(<ProfileStaus status="it-Kamasutra"/>)
        const root = component.root
        let span = root.findByType('span')
        span.props.onDoubleClick()
        let input = root.findByType('input')
        expect(input.props.value).toBe('it-Kamasutra')
    })

    test('callback should be called', () => {
        const mocKCallback = jest.fn()
        const component = create(
            <ProfileStaus status="it-Kamasutra" updateStatus={mocKCallback}/>
        )
        const instance = component.getInstance()
        instance.deActivateEditMode()
        expect(mocKCallback.mock.calls.length).toBe(1)
    })
})
