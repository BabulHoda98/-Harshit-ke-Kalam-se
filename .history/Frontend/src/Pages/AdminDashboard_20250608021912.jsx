import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroBanner, LatestNews, FeaturedArticles, PhotoGallery, PopularTags, Newsletter, VideoNews, BrowseByCategory, LocalNews, FooterLinks } from '../Components/HomeSections';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [siteTitle, setSiteTitle] = useState('');
  const [footerLinks, setFooterLinks] = useState([
