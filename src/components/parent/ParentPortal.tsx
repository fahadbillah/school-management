import React, { useState } from 'react';
import {
  StatCard,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Badge,
  Button,
  Input,
  Select,
  Modal,
  Tabs,
} from 'react-component-library';
import { useSchoolStore } from '../../context/useSchoolStore';
import type { FeeInvoice } from '../../types/models';

export interface ParentPortalProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const ParentPortal: React.FC<ParentPortalProps> = ({
  activeTab: externalTab,
  onTabChange,
}) => {
  const {
    students,
    fees,
    busRoutes,
    messages,
    leaveRequests,
    payFeeInvoice,
    sendMessage,
    submitLeaveRequest,
    showToast,
  } = useSchoolStore();

  const [internalTab, setInternalTab] = useState('overview');
  const activeTab = externalTab || internalTab;
  const handleTabChange = onTabChange || setInternalTab;

  // Multi-ward switcher: Lucas (student-1) vs Maya (student-2)
  const [selectedWardId, setSelectedWardId] = useState('student-1');

  // Bus Tracking Modal
  const [isBusMapModalOpen, setIsBusMapModalOpen] = useState(false);

  // Fee Payment Gateway Modal
  const [selectedInvoice, setSelectedInvoice] = useState<FeeInvoice | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card (Visa •••• 4410)');

  // Educator Messaging State
  const [messageRecipient, setMessageRecipient] = useState('faculty-1');
  const [newMessageText, setNewMessageText] = useState('');

  // Leave Application Modal
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [leaveCategory, setLeaveCategory] = useState<'Medical' | 'Personal' | 'Family Emergency'>('Medical');
  const [leaveStartDate, setLeaveStartDate] = useState('2026-10-14');
  const [leaveEndDate, setLeaveEndDate] = useState('2026-10-15');
  const [leaveReason, setLeaveReason] = useState('');

  // Conference Scheduler Modal
  const [isConferenceModalOpen, setIsConferenceModalOpen] = useState(false);
  const [conferenceDate, setConferenceDate] = useState('2026-10-22');
  const [conferenceSlot, setConferenceSlot] = useState('03:30 PM - 04:00 PM');

  // Currently active child record
  const currentWard = students.find((s) => s.id === selectedWardId) || students[0];
  const wardFees = fees.filter((f) => f.studentId === selectedWardId);
  const pendingFees = wardFees.filter((f) => f.status !== 'paid');
  const wardBus = busRoutes[0];

  const parentTabs = [
    { id: 'overview', label: 'Ward Overview' },
    { id: 'bustracker', label: 'Live Bus GPS' },
    { id: 'fees', label: 'Fee Payments' },
    { id: 'messaging', label: 'Teacher Messaging' },
    { id: 'leave', label: 'Leave & Consent' },
  ];

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice) return;
    payFeeInvoice(selectedInvoice.id, paymentMethod);
    setSelectedInvoice(null);
  };

  const handleSendMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;
    sendMessage(messageRecipient, selectedWardId, newMessageText);
    setNewMessageText('');
  };

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveReason.trim()) {
      showToast('Please specify the reason for absence', 'error');
      return;
    }
    submitLeaveRequest({
      studentId: selectedWardId,
      studentName: currentWard.name,
      parentName: 'Katherine Montgomery',
      category: leaveCategory,
      startDate: leaveStartDate,
      endDate: leaveEndDate,
      reason: leaveReason,
    });
    setIsLeaveModalOpen(false);
    setLeaveReason('');
  };

  const handleScheduleConference = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Conference requested with Prof. Eleanor Vance on ${conferenceDate} at ${conferenceSlot}`);
    setIsConferenceModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Multi-Ward Switcher Header Bar */}
      <Card elevation={1} style={{ background: '#f8fafc' }}>
        <CardContent style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>👨‍👩‍👧</span>
              <div>
                <strong style={{ fontSize: '15px' }}>Enrolled Child Profile:</strong>
                <div style={{ fontSize: '12px', color: '#64748b' }}>Select ward to dynamically refresh linked feeds</div>
              </div>
            </div>

            <div style={{ minWidth: '260px' }}>
              <Select
                value={selectedWardId}
                onChange={(e) => setSelectedWardId(e.target.value)}
                options={[
                  { value: 'student-1', label: 'Lucas Montgomery (Grade 8A)' },
                  { value: 'student-2', label: 'Maya Montgomery (Grade 5B)' },
                ]}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs
        tabs={parentTabs}
        activeTab={activeTab}
        onChange={handleTabChange}
        variant="pill"
        scrollable
      />

      {/* 1. Multi-Ward Overview Dashboard */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="grid-4col">
            <StatCard
              title="Daily Attendance Status"
              value={currentWard.attendanceStatus.toUpperCase()}
              trend={{ direction: 'up', value: 'Recorded Today 08:30 AM' }}
            />
            <StatCard
              title="Outstanding Dues"
              value={`$${pendingFees.reduce((sum, f) => sum + f.totalAmount, 0).toLocaleString()}`}
              trend={{ direction: pendingFees.length > 0 ? 'down' : 'up', value: `${pendingFees.length} Pending Invoices` }}
            />
            <StatCard
              title="Academic Term GPA"
              value={`${currentWard.gpa} / 4.0`}
              trend={{ direction: 'up', value: 'High Academic Standing' }}
            />
            <StatCard
              title="Bus Transit Health"
              value="On Schedule"
              trend={{ direction: 'neutral', value: 'ETA ~12 mins to stop' }}
            />
          </div>

          <div className="grid-2col">
            {/* Child Profile Snapshot */}
            <Card elevation={1}>
              <CardHeader bordered>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <CardTitle>Child Academic Profile</CardTitle>
                  <Badge variant="info">{currentWard.grade} - Section {currentWard.section}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <img
                    src={currentWard.avatar}
                    alt={currentWard.name}
                    style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <h3 style={{ fontSize: '18px', margin: 0 }}>{currentWard.name}</h3>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>
                      Enrollment ID: <code>{currentWard.enrollmentNo}</code>
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                      Class Teacher: Prof. Eleanor Vance (Room 204)
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                  <Button variant="primary" size="sm" onClick={() => handleTabChange('bustracker')}>
                    Track School Bus
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => handleTabChange('fees')}>
                    Review Tuition Fees
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions for Parents */}
            <Card elevation={1}>
              <CardHeader bordered>
                <CardTitle>Family Actions & Requests</CardTitle>
                <Badge variant="success">Active</Badge>
              </CardHeader>
              <CardContent>
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                  Fast access to parent-teacher conferences and absence notifications:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Button variant="primary" size="md" onClick={() => setIsLeaveModalOpen(true)}>
                    📝 Submit Student Absence Leave Slip
                  </Button>
                  <Button variant="secondary" size="md" onClick={() => setIsConferenceModalOpen(true)}>
                    🤝 Request Parent-Teacher Conference Slot
                  </Button>
                  <Button variant="ghost" size="md" onClick={() => handleTabChange('messaging')}>
                    💬 Message Class Teacher Directly
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* 2. Real-Time Bus GPS Tracker */}
      {activeTab === 'bustracker' && (
        <Card elevation={1}>
          <CardHeader bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <div>
                <CardTitle>Live School Bus GPS Transit Monitor</CardTitle>
                <p style={{ fontSize: '13px', color: '#64748b' }}>
                  Assigned Route: {wardBus.routeName} • {wardBus.vehicleNo}
                </p>
              </div>
              <Badge variant="success">Transmitting Live Coordinates</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Simulated Map Container */}
              <div
                style={{
                  height: '240px',
                  background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                  borderRadius: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ fontSize: '42px', marginBottom: '8px' }}>🗺️ 🚌</div>
                <strong style={{ fontSize: '16px' }}>GPS Tracking: {wardBus.vehicleNo}</strong>
                <p style={{ fontSize: '13px', color: '#94a3b8' }}>
                  Current Position: Approaching {wardBus.currentStop} (Lat: 37.7749, Lng: -122.4194)
                </p>
                <div style={{ marginTop: '12px' }}>
                  <Button variant="secondary" size="sm" onClick={() => setIsBusMapModalOpen(true)}>
                    Expand Fullscreen Satellite Map
                  </Button>
                </div>
              </div>

              {/* Transit Metrics */}
              <div className="grid-2col">
                <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <strong style={{ fontSize: '14px' }}>Transit Highlights</strong>
                  <div style={{ fontSize: '13px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div>👨‍✈️ Driver: <strong>{wardBus.driverName}</strong> ({wardBus.driverPhone})</div>
                    <div>🛑 Next Stop: <strong>{wardBus.nextStop}</strong></div>
                    <div>⏱️ Estimated Arrival: <strong>{wardBus.etaMinutes} minutes</strong></div>
                  </div>
                </div>

                <div style={{ padding: '14px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                  <strong style={{ fontSize: '14px', color: '#166534' }}>Boarding Safety Check</strong>
                  <div style={{ fontSize: '13px', color: '#15803d', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div>✓ RFID Scan: Student Boarded at 07:42 AM</div>
                    <div>✓ Seatbelt Telemetry: Engaged</div>
                    <div>✓ Speed Compliance: 28 mph (School Zone Limit)</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 3. Fee Ledger & Digital Payment Gateway Simulation */}
      {activeTab === 'fees' && (
        <Card elevation={1}>
          <CardHeader bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <div>
                <CardTitle>Tuition Fee Ledger & Payment Center</CardTitle>
                <p style={{ fontSize: '13px', color: '#64748b' }}>
                  Review outstanding terms, download historical receipts, and pay online.
                </p>
              </div>
              <Badge variant={pendingFees.length > 0 ? 'warning' : 'success'}>
                {pendingFees.length > 0 ? `${pendingFees.length} Dues Pending` : 'All Fees Cleared'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {wardFees.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell><code>{inv.id}</code></TableCell>
                    <TableCell>
                      <div>
                        <strong>{inv.title}</strong>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>
                          Tuition: ${inv.tuitionFee} • Bus: ${inv.transportFee} • Activity: ${inv.activityFee}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{inv.dueDate}</TableCell>
                    <TableCell><strong>${inv.totalAmount.toLocaleString()}</strong></TableCell>
                    <TableCell>
                      <Badge variant={inv.status === 'paid' ? 'success' : inv.status === 'pending' ? 'warning' : 'danger'}>
                        {inv.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {inv.status !== 'paid' ? (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => setSelectedInvoice(inv)}
                        >
                          Pay Dues Online
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => showToast(`Receipt #${inv.receiptNo} downloaded`)}
                        >
                          Download Receipt
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* 4. Educator Messaging & Meeting Scheduler */}
      {activeTab === 'messaging' && (
        <Card elevation={1}>
          <CardHeader bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <div>
                <CardTitle>Direct Educator Communication Thread</CardTitle>
                <p style={{ fontSize: '13px', color: '#64748b' }}>
                  Direct line with classroom teachers, subject instructors, and academic coordinators.
                </p>
              </div>
              <Button variant="secondary" size="sm" onClick={() => setIsConferenceModalOpen(true)}>
                Schedule Meeting
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Message History */}
              <div
                style={{
                  height: '240px',
                  overflowY: 'auto',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '16px',
                  background: '#f8fafc',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                {messages.map((msg) => {
                  const isParent = msg.senderRole === 'parent';
                  return (
                    <div
                      key={msg.id}
                      style={{
                        alignSelf: isParent ? 'flex-end' : 'flex-start',
                        maxWidth: '75%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        background: isParent ? '#2563eb' : '#ffffff',
                        color: isParent ? '#ffffff' : '#0f172a',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                      }}
                    >
                      <div style={{ fontSize: '11px', opacity: 0.8, marginBottom: '4px' }}>
                        {msg.senderName} • {msg.timestamp}
                      </div>
                      <div style={{ fontSize: '13px' }}>{msg.content}</div>
                    </div>
                  );
                })}
              </div>

              {/* Message Composer */}
              <form onSubmit={handleSendMessageSubmit} style={{ display: 'flex', gap: '10px' }}>
                <div style={{ width: '220px' }}>
                  <Select
                    value={messageRecipient}
                    onChange={(e) => setMessageRecipient(e.target.value)}
                    options={[
                      { value: 'faculty-1', label: 'Prof. Eleanor Vance (Math)' },
                      { value: 'faculty-2', label: 'Dr. Jonathan Ross (Physics)' },
                      { value: 'faculty-3', label: 'Sarah Henderson (Literature)' },
                    ]}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <Input
                    placeholder="Type your message to educator..."
                    value={newMessageText}
                    onChange={(e) => setNewMessageText(e.target.value)}
                    required
                  />
                </div>
                <Button variant="primary" size="md" type="submit">
                  Send
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 5. Leave Application & Event Consent Hub */}
      {activeTab === 'leave' && (
        <Card elevation={1}>
          <CardHeader bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <div>
                <CardTitle>Absence Leave Applications & Event Consents</CardTitle>
                <p style={{ fontSize: '13px', color: '#64748b' }}>
                  Submit digital leave requests and sign event excursion consent slips.
                </p>
              </div>
              <Button variant="primary" size="sm" onClick={() => setIsLeaveModalOpen(true)}>
                + New Leave Request
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reviewed By</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaveRequests.map((lvr) => (
                  <TableRow key={lvr.id}>
                    <TableCell><strong>{lvr.category}</strong></TableCell>
                    <TableCell>{lvr.startDate} to {lvr.endDate}</TableCell>
                    <TableCell>&quot;{lvr.reason}&quot;</TableCell>
                    <TableCell>
                      <Badge variant={lvr.status === 'approved' ? 'success' : lvr.status === 'rejected' ? 'danger' : 'warning'}>
                        {lvr.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{lvr.reviewedBy || 'Pending in Educator Queue'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Modal: Payment Gateway Simulation */}
      {selectedInvoice && (
        <Modal
          isOpen={!!selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          title={`Digital Payment: ${selectedInvoice.title}`}
          size="md"
        >
          <form onSubmit={handlePaymentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span>Tuition Fees:</span>
                <strong>${selectedInvoice.tuitionFee}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span>Transport & Bus Transit:</span>
                <strong>${selectedInvoice.transportFee}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span>Activity & Lab Amenities:</span>
                <strong>${selectedInvoice.activityFee}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '8px', fontSize: '15px' }}>
                <strong>Net Payable:</strong>
                <strong style={{ color: '#2563eb' }}>${selectedInvoice.totalAmount}</strong>
              </div>
            </div>

            <Select
              label="Select Payment Method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              options={[
                { value: 'Credit Card (Visa •••• 4410)', label: 'Credit Card (Visa •••• 4410)' },
                { value: 'Bank Direct Debit (ACH)', label: 'Bank Direct Debit (ACH)' },
                { value: 'Apple Pay / UPI', label: 'Apple Pay / Digital Wallet' },
              ]}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
              <Button variant="ghost" size="md" type="button" onClick={() => setSelectedInvoice(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="md" type="submit">
                Authorize Payment (${selectedInvoice.totalAmount})
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Modal: Fullscreen Bus Route Map */}
      <Modal
        isOpen={isBusMapModalOpen}
        onClose={() => setIsBusMapModalOpen(false)}
        title="Live Fleet Transit Telemetry & Map"
        size="lg"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div
            style={{
              height: '320px',
              background: '#0f172a',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>🛰️ 📍</div>
            <strong style={{ fontSize: '18px' }}>Active Bus Route 4 (Volvo Ecoliner #08A)</strong>
            <p style={{ color: '#94a3b8', fontSize: '13px' }}>
              Speed: 32 km/h • Bearing: 142° SE • Heading to Merit Academy North Gate
            </p>
          </div>
          <Button variant="primary" size="md" onClick={() => setIsBusMapModalOpen(false)}>
            Close Telemetry View
          </Button>
        </div>
      </Modal>

      {/* Modal: Leave Application */}
      <Modal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        title={`Apply for Student Absence: ${currentWard.name}`}
        size="md"
      >
        <form onSubmit={handleLeaveSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Select
            label="Leave Classification"
            value={leaveCategory}
            onChange={(e) => setLeaveCategory(e.target.value as 'Medical' | 'Personal' | 'Family Emergency')}
            options={[
              { value: 'Medical', label: 'Medical / Health Appointment' },
              { value: 'Personal', label: 'Personal / Domestic Obligation' },
              { value: 'Family Emergency', label: 'Family Emergency' },
            ]}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <Input
              label="Start Date"
              type="date"
              value={leaveStartDate}
              onChange={(e) => setLeaveStartDate(e.target.value)}
              required
            />
            <Input
              label="End Date"
              type="date"
              value={leaveEndDate}
              onChange={(e) => setLeaveEndDate(e.target.value)}
              required
            />
          </div>
          <Input
            label="Reason Narrative"
            value={leaveReason}
            onChange={(e) => setLeaveReason(e.target.value)}
            placeholder="Describe reason for leave..."
            required
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
            <Button variant="ghost" size="md" type="button" onClick={() => setIsLeaveModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="md" type="submit">
              Submit Absence Slip
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Parent Teacher Conference Scheduler */}
      <Modal
        isOpen={isConferenceModalOpen}
        onClose={() => setIsConferenceModalOpen(false)}
        title="Schedule Parent-Teacher Conference"
        size="md"
      >
        <form onSubmit={handleScheduleConference} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Input
            label="Proposed Date"
            type="date"
            value={conferenceDate}
            onChange={(e) => setConferenceDate(e.target.value)}
            required
          />
          <Select
            label="Preferred Time Window"
            value={conferenceSlot}
            onChange={(e) => setConferenceSlot(e.target.value)}
            options={[
              { value: '03:30 PM - 04:00 PM', label: '03:30 PM - 04:00 PM' },
              { value: '04:00 PM - 04:30 PM', label: '04:00 PM - 04:30 PM' },
              { value: '04:30 PM - 05:00 PM', label: '04:30 PM - 05:00 PM' },
            ]}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
            <Button variant="ghost" size="md" type="button" onClick={() => setIsConferenceModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="md" type="submit">
              Confirm Conference Appointment
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
