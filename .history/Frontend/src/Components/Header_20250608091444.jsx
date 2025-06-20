import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  "Home",
  "About",
  "Contact"
];

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
