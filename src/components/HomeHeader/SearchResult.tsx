/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-console */
import { ResultItem,ResultsContainer } from './SearchResult.styles'

interface SearchResultsProps {
    lessons: any[]
    onSelect: (lesson: any) => void
  }

const SearchResults: React.FC<SearchResultsProps> = ({ lessons, onSelect }) => {
    return (
        <ResultsContainer>
        {lessons.map(lesson => (
            <ResultItem key={lesson.id} onClick={() => onSelect(lesson)}>
            {lesson.description}
            </ResultItem>
        ))}
        </ResultsContainer>
    )
}
  
export default SearchResults