// UNIT TEST

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import TablesList from '..'
import MOCK_REPOS from './mockDataRepos.json'
import MOCK_STARRED from './mockDataStarred.json'

const fakePropsRepos = {
    dataHeader: MOCK_REPOS.dataHeader,
}
const fakePropsStarred = {
    dataHeader: MOCK_STARRED.dataHeader,
}

describe('#TablesList', () => {
    describe('#Smoke Tests',()=>{
        it('should render the Headers if the array is repos', () => {
            const { getByText } = render(<TablesList {...fakePropsRepos} />)
            
            expect(getByText(/Repositório/i)).toBeVisible()
            expect(getByText(/Linguagem/i)).toBeVisible()
            expect(getByText(/Nome Completo/i)).toBeVisible()
            expect(getByText(/Url/i)).toBeVisible()
        })
        it('should render the Headers if the array is starreds', () => {
            const { getByText } = render(<TablesList {...fakePropsStarred} />)
            
            expect(getByText(/Repositório/i)).toBeVisible()
            expect(getByText(/Autor/i)).toBeVisible()
            expect(getByText(/Linguagem/i)).toBeVisible()
            expect(getByText(/Nome Completo/i)).toBeVisible()
            expect(getByText(/Url/i)).toBeVisible()
        })

    })
})
