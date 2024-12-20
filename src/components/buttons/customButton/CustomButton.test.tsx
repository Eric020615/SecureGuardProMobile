import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Text, View } from 'react-native'
import CustomButton from '@components/buttons/customButton/CustomButton'

describe('CustomButton Component', () => {
    const defaultProps = {
        handlePress: jest.fn(),
        testId: 'custom-button',
    }

    // Helper function to render the component
    const setup = (props = {}) => {
        const combinedProps = { ...defaultProps, ...props }
        const utils = render(<CustomButton {...combinedProps} />)
        return { ...utils, props: combinedProps }
    }

    // Reset the mock function before each test
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should render without title', () => {
        const { getByTestId, queryByText } = setup()
        expect(getByTestId(defaultProps.testId)).toBeTruthy()
        expect(queryByText('')).toBeNull()
    })

    it('should render with a title', () => {
        const title = 'Click Me'
        const { getByText } = setup({ title })
        expect(getByText(title)).toBeTruthy()
    })

    it('should not call handlePress when isLoading', () => {
        const { getByTestId, props } = setup({ isLoading: true })
        fireEvent.press(getByTestId(props.testId))
        expect(props.handlePress).not.toHaveBeenCalled()
    })

    it('should call handlePress when pressed', () => {
        const { getByTestId, props } = setup()
        fireEvent.press(getByTestId(props.testId))
        expect(props.handlePress).toHaveBeenCalled()
    })

    it('should display left icon if provided', () => {
        const leftIcon = <Text>Left Icon</Text>
        const { getByText } = setup({ leftReactNativeIcons: leftIcon })
        expect(getByText('Left Icon')).toBeTruthy()
    })

    it('should display right icon if provided', () => {
        const rightIcon = (
            <View>
                <Text>Right Icon</Text>
            </View>
        )
        const { getByText } = setup({ rightReactNativeIcons: rightIcon })
        expect(getByText('Right Icon')).toBeTruthy()
    })
})
