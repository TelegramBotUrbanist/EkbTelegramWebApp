export const useMapLocations = () => {
  const setLocations = useUpdateAtom(mapLocationsAtom);
  const setLoading = useUpdateAtom(mapLoadingAtom);
  const setError = useUpdateAtom(mapErrorAtom);

  const fetchLocations = async (params: FetchLocationsParams = {}) => {
    setLoading(true);
    setError(null);

    try {
      const locations = await mapActions.fetchLocations(params);
      setLocations(locations);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchLocations,
    fetchNearbyLocations: mapActions.fetchNearbyLocations,
    fetchLocationsByCategory: mapActions.fetchLocationsByCategory
  };
};