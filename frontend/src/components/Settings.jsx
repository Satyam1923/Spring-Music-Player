import React, { useState } from 'react';
import './Settings.css';
import { MdKeyboardBackspace } from "react-icons/md";
import { Link } from 'react-router-dom';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('premium-plan');
    const [openQuestion, setOpenQuestion] = useState(null);

    const toggleQuestion = (question) => {
        setOpenQuestion(openQuestion === question ? null : question);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'premium-plan':
                return (
                    <div>
                        <h2 className='text-[#7373cc] mt-6  text-2xl ml-2  font-bold'>Premium Plan</h2>
                        <section className=" ">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="text-center mb-12">
                                </div>

                                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

                                    <div className="bg-[#30309E] rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
                                        <div className="mb-8">
                                            <h3 className="text-xl font-semibold text-white">Free</h3>
                                            <p className="mt-4 text-gray-400">Get started with our basic features.</p>
                                        </div>
                                        <div className="mb-8">
                                            <span className="text-5xl font-extrabold text-white">$0</span>
                                            <span className="text-xl font-medium text-gray-400">/mo</span>
                                        </div>
                                        <ul className="mb-8 space-y-4 text-gray-400">
                                            <li className="flex items-center">
                                                <svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>1 user account</span>
                                            </li>
                                            <li className="flex items-center">
                                                <svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>10 Songs Download per month</span>
                                            </li>
                                            <li className="flex items-center">
                                                <svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>Basic support</span>
                                            </li>
                                        </ul>
                                        <a href="#" className="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                                            Sign Up
                                        </a>
                                    </div>

                                    <div className="bg-[#30309E] rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
                                        <div className="mb-8">
                                            <h3 className="text-xl font-semibold text-white">Starter</h3>
                                            <p className="mt-4 text-gray-400">Perfect for Students and individuals.</p>
                                        </div>
                                        <div className="mb-8">
                                            <span className="text-5xl font-extrabold text-white">$49</span>
                                            <span className="text-xl font-medium text-gray-400">/mo</span>
                                        </div>
                                        <ul className="mb-8 space-y-4 text-gray-400">
                                            <li className="flex items-center">
                                                <svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>5 user accounts</span>
                                            </li>
                                            <li className="flex items-center">
                                                <svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>100 Songs Downloads per month</span>
                                            </li>
                                            <li className="flex items-center">
                                                <svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>Standard support</span>
                                            </li>
                                        </ul>
                                        <a href="#" className="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 bottom-0">
                                            Get Started
                                        </a>
                                    </div>

                                    <div className="bg-[#30309E] rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
                                        <div className="mb-8">
                                            <h3 className="text-xl font-semibold text-white">Pro</h3>
                                            <p className="mt-4 text-gray-400">Ideal for family and friend groups.</p>
                                        </div>
                                        <div className="mb-8">
                                            <span className="text-5xl font-extrabold text-white">$99</span>
                                            <span className="text-xl font-medium text-gray-400">/mo</span>
                                        </div>
                                        <ul className="mb-8 space-y-4 text-gray-400">
                                            <li className="flex items-center">
                                                <svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>Unlimited user accounts</span>
                                            </li>
                                            <li className="flex items-center">
                                                <svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>Unlimited Songs Download</span>
                                            </li>
                                            <li className="flex items-center">
                                                <svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>Priority support</span>
                                            </li>
                                            <li className="flex items-center">
                                                <svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>Advanced analytics</span>
                                            </li>
                                        </ul>
                                        <a href="#" className="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                                            Get Started
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                );
            case 'offline-mode':
                return (
                    <div>
                        <h2 className='text-[#7373cc] mb-6 mt-6  text-2xl font-bold'>Offline Mode</h2>
                        <p>Toggle offline mode to listen to your downloaded songs without an internet connection.</p>
                        <a href="#" className="block w-52 mt-6 py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">Enable Offline Mode</a>
                    </div>
                );
            case 'volume-settings':
                return (
                    <div>
                        <h2 className='text-[#7373cc] mb-6 mt-6  text-2xl font-bold'>Volume Settings</h2>
                        <p className='mb-4'>Adjust the playback volume and other related settings.</p>
                        <label >Volume  <input className="ml-4 mt-2 w-64" type="range" min="0" max="100" /></label>
                    </div>
                );
            case 'languages':
                return (
                    <div>
                        <h2 className='text-[#7373cc] mb-6 mt-6  text-2xl font-bold'>Languages</h2>
                        <p>Select your preferred language for the app interface.</p>
                        <select className='bg-gray-700 mt-3 px-3 py-1 rounded-md'>
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                        </select>
                    </div>
                );
            case 'explicit-content':
                return (
                    <div>
                        <h2 className='text-[#7373cc] mb-6 mt-6  text-2xl font-bold'>Allow Explicit Content</h2>
                        <p className='mb-4'>Enable or disable explicit content in your music recommendations.</p>
                        <label>
                            <input type="checkbox" /> Allow Explicit Content
                        </label>
                    </div>
                );
            case 'audio-quality':
                return (
                    <div>
                        <h2 className='text-[#7373cc] mb-6 mt-6 text-2xl font-bold'>Audio Quality</h2>
                        <p>Choose your preferred audio quality for streaming and downloads.</p>
                        <select className='bg-gray-700 mt-3 px-3 py-1 rounded-md'>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                );
            case 'download':
                return (
                    <div>
                        <h2 className='text-[#7373cc] mb-6 mt-6  text-2xl font-bold'>Download</h2>
                        <p>Manage your downloaded songs and available storage space.</p>
                        <button className='block w-52 mt-6 py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'>View Downloads</button>
                    </div>
                );
            case 'storage':
                return (
                    <div>
                        <h2 className='text-[#7373cc] mb-6 mt-6  text-2xl font-bold'>Storage</h2>
                        <p>Manage your app storage and clear cached data.</p>
                        <button className='block w-52 mt-6 py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'>Manage Storage</button>
                        <p className='mt-6'>Clear cached data to free up storage space on your device.</p>
                        <button className='block w-52 mt-6 py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'>Clear Cache</button>
                    </div>
                );

            case 'version':
                return (
                    <div>
                        <h2 className='text-[#7373cc] mb-6 mt-6  text-2xl font-bold'>Version</h2>
                        <p>Check the current version of the app and see what's new.</p>
                        <p className='text-[#8e8ee9] mt-4 font-bold text-2xl'>App Version: 1.0.0</p>
                    </div>
                );
            case 'logout':
                return (
                    <div>
                        <h2 className='text-[#7373cc] mb-6 mt-6  text-2xl font-bold'>Logout</h2>
                        <p>Sign out of your account.</p>
                        <button className='block w-52 mt-6 py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'>Logout</button>
                    </div>
                );
            case 'faq':
                return (
                    <div className="p-4">
                        <h2 className='text-[#7373cc] mb-6 mt-2 text-xl font-bold'>
                            Frequently Asked Questions
                        </h2>
                        <div className="cursor-pointer mb-4 border-b border-gray-300 pb-2">
                            <div className="font-medium text-lg hover:text-indigo-400" onClick={() => toggleQuestion('q1')}>
                                What is the Premium Plan?
                            </div>
                            {openQuestion === 'q1' && (
                                <div className="mt-3 mb-6 text-sm text-[#f7f7ff]">
                                    The Premium Plan offers ad-free music, offline listening, and more.
                                </div>
                            )}
                        </div>
                        <div className="cursor-pointer mb-4 border-b border-gray-300 pb-2">
                            <div className="font-medium text-lg hover:text-indigo-400" onClick={() => toggleQuestion('q2')}>
                                How can I enable Offline Mode?
                            </div>
                            {openQuestion === 'q2' && (
                                <div className="mt-3 mb-6 text-sm text-[#f7f7ff]">
                                    You can enable Offline Mode in the settings to listen to downloaded songs without an internet connection.
                                </div>
                            )}
                        </div>
                        <div className="cursor-pointer mb-4 border-b border-gray-300 pb-2">
                            <div className="font-medium text-lg hover:text-indigo-400" onClick={() => toggleQuestion('q3')}>
                                How do I adjust the volume settings?
                            </div>
                            {openQuestion === 'q3' && (
                                <div className="mt-3 mb-6 text-sm text-[#f7f7ff]">
                                    Volume settings can be adjusted in the Volume Settings tab under the Settings menu.
                                </div>
                            )}
                        </div>
                        <div className="cursor-pointer mb-4 border-b border-gray-300 pb-2">
                            <div className="font-medium text-lg hover:text-indigo-400" onClick={() => toggleQuestion('q4')}>
                                How do I change the app language?
                            </div>
                            {openQuestion === 'q4' && (
                                <div className="mt-3 mb-6 text-sm text-[#f7f7ff]">
                                    Language preferences can be changed in the Languages tab under the Settings menu.
                                </div>
                            )}
                        </div>
                        <div className="cursor-pointer mb-4 border-b border-gray-300 pb-2">
                            <div className="font-medium text-lg hover:text-indigo-400" onClick={() => toggleQuestion('q5')}>
                                Can I disable explicit content?
                            </div>
                            {openQuestion === 'q5' && (
                                <div className="mt-3 mb-6 text-sm text-[#f7f7ff]">
                                    Yes, you can disable explicit content in the Allow Explicit Content tab under the Settings menu.
                                </div>
                            )}
                        </div>
                        <div className="cursor-pointer mb-4 border-b border-gray-300 pb-2">
                            <div className="font-medium text-lg hover:text-indigo-400" onClick={() => toggleQuestion('q6')}>
                                How do I check the app version?
                            </div>
                            {openQuestion === 'q6' && (
                                <div className="mt-3 mb-6 text-sm text-[#f7f7ff]">
                                    You can check the current app version in the Version tab under the Settings menu.
                                </div>
                            )}
                        </div>
                    </div>
                );


            default:
                return <div>Premium Plan content goes here.</div>;
        }
    };

    return (

        <div className="settings-page">
            <div className="settings-sidebar">
                <div className='bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-2 py-1 rounded-2xl w-[40px]'>
                    <Link to="/" className="flex items-center text-indigo-500 hover:text-indigo-700">
                        <MdKeyboardBackspace className="mr- text-xl" />
                    </Link>
                </div>

                <ul>
                    <li className={activeTab === 'premium-plan' ? 'active' : ''} onClick={() => setActiveTab('premium-plan')}>Premium Plan</li>
                    <li className={activeTab === 'offline-mode' ? 'active' : ''} onClick={() => setActiveTab('offline-mode')}>Offline Mode</li>
                    <li className={activeTab === 'volume-settings' ? 'active' : ''} onClick={() => setActiveTab('volume-settings')}>Volume Settings</li>
                    <li className={activeTab === 'languages' ? 'active' : ''} onClick={() => setActiveTab('languages')}>Languages</li>
                    <li className={activeTab === 'explicit-content' ? 'active' : ''} onClick={() => setActiveTab('explicit-content')}>Allow Explicit Content</li>
                    <li className={activeTab === 'audio-quality' ? 'active' : ''} onClick={() => setActiveTab('audio-quality')}>Audio Quality</li>
                    <li className={activeTab === 'download' ? 'active' : ''} onClick={() => setActiveTab('download')}>Download</li>
                    <li className={activeTab === 'storage' ? 'active' : ''} onClick={() => setActiveTab('storage')}>Storage</li>
                    <li className={activeTab === 'faq' ? 'active' : ''} onClick={() => setActiveTab('faq')}>FAQ</li>
                    <li className={activeTab === 'version' ? 'active' : ''} onClick={() => setActiveTab('version')}>Version</li>
                    <li className={activeTab === 'logout' ? 'active' : ''} onClick={() => setActiveTab('logout')}>Logout</li>
                </ul>
            </div>
            <div className="settings-content">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default Settings;
