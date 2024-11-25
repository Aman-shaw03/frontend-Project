import React,{useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { VideoList } from '../components'
import { emptyPagingVideosData, getAllVideosByOption } from '../app/Slices/paginationSlice'

function SearchResult() {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const query = searchParams.get("search_query");

    /*This hook is used to access and manipulate search parameters (query string) in the URL.
    It returns an array containing two elements:
    The current search parameters as a URLSearchParams object. inside it there is a key value with "search_query"
    A function to update those search parameters. */

    const { loading } = useSelector(({ pagingVideos }) => pagingVideos);
    const { videos } = useSelector(({ pagingVideos }) => pagingVideos.data);
    const { pagingInfo } = useSelector(({ pagingVideos }) => pagingVideos.data);
    const sectionRef = useRef();
    const fetchedPageRef = useRef();
    const pagingInfoRef = useRef(pagingInfo);
    pagingInfoRef.current = pagingInfo;

    useEffect(() => {
        fetchedPageRef.current = new Set();
    
        sectionRef.current = document.getElementById("scrollable_results_screen");
        sectionRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    
        dispatch(getAllVideosByOption({ search: query, page: 1, limit: 6 }))
          .unwrap()
          .then(() => {
            fetchedPageRef.current.add(1);
          });
    
        return () => {
          fetchedPageRef.current.clear();
          dispatch(emptyPagingVideosData());
        };
      }, [query, searchParams]);
    
      useEffect(() => {
        const section = document.getElementById("scrollable_results_screen");
        section.addEventListener("scroll", handleScroll);
        return () => {
          section.removeEventListener("scroll", handleScroll);
        };
      }, []);
    
      const handleScroll = () => {
        const section = document.getElementById("scrollable_results_screen");
        // Height of whole section
        const scrollHeight = section.scrollHeight;
        // how much section is scrolled (with respect to document)
        const scrolledValue = section.clientHeight + section.scrollTop;
    
        if (scrolledValue + 5 > scrollHeight) {
          const currentPagingInfo = pagingInfoRef.current;
          if (
            currentPagingInfo.hasNextPage &&
            !fetchedPageRef.current.has(currentPagingInfo.nextPage)
          ) {
            fetchedPageRef.current.add(currentPagingInfo.nextPage);
            dispatch(
              getAllVideosByOption({ search: query, page: `${currentPagingInfo.nextPage}`, limit: 6 })
            );
          }
        }
      };
      return (
        <VideoList
          videos={videos}
          loading={loading && !fetchedPageRef.current.has(1)}
          fetching={loading && videos?.length > 0}
        />
      );
}

export default SearchResult